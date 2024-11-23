import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  DocumentReference,
  updateDoc,
  arrayRemove,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

export interface User {
  favorites: DocumentReference[];
}

export interface Favorite {
  id: string;
  [key: string]: any;
}

interface FavoritesContextProps {
  userFavorites: Favorite[];
  refreshFavorites: () => Promise<void>;
  addToFavorites: (ref: DocumentReference) => Promise<void>;
  removeFromFavorites: (ref: DocumentReference) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextProps | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userFavorites, setUserFavorites] = useState<Favorite[]>([]);
  const [user] = useAuthState(auth);

  const refreshFavorites = async () => {
    if (!user) return;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data() as User;
        const favoriteRefs = userData.favorites || [];

        const favoriteDocs = await Promise.all(
          favoriteRefs.map(async (ref) => {
            const docSnap = await getDoc(ref);
            return docSnap.exists()
              ? { id: docSnap.id, ...docSnap.data() }
              : null;
          })
        );

        setUserFavorites(
          favoriteDocs.filter((doc) => doc !== null) as Favorite[]
        );
      } else {
        setUserFavorites([]); // Clear favorites if user has none
      }
    } catch (error) {
      console.error("Error refreshing favorites:", error);
    }
  };

  const addToFavorites = async (ref: DocumentReference) => {
    if (!user) return;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref;
        await updateDoc(userDoc, {
          favorites: arrayUnion(ref),
        });
        refreshFavorites(); // Ensure state updates immediately
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (ref: DocumentReference) => {
    if (!user) return;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref;
        await updateDoc(userDoc, {
          favorites: arrayRemove(ref),
        });
        refreshFavorites(); // Ensure state updates immediately
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  useEffect(() => {
    if (user) {
      // Live updates for userFavorites
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data() as User;
          const favoriteRefs = userData.favorites || [];

          const favoriteDocs = await Promise.all(
            favoriteRefs.map(async (ref) => {
              const docSnap = await getDoc(ref);
              return docSnap.exists()
                ? { id: docSnap.id, ...docSnap.data() }
                : null;
            })
          );

          setUserFavorites(
            favoriteDocs.filter((doc) => doc !== null) as Favorite[]
          );
        } else {
          setUserFavorites([]); // Clear favorites if user has none
        }
      });

      return () => unsubscribe(); // Cleanup on unmount
    }
  }, [user]);

  return (
    <FavoritesContext.Provider
      value={{
        userFavorites,
        refreshFavorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};