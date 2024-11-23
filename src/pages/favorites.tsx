import { auth } from "../config/firebase";
import "../css/favorites.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  doc,
  updateDoc,
  arrayUnion,
  where,
  getDocs,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import Post from "../components/post";

export interface User {
  favorites: DocumentReference[]; // Array of references to favorite documents
  id: string;
  username: string;
  email: string;
}

const Favorites = () => {
  const usersRef = collection(db, "users");
  const [userFavorites, setUserFavorites] = useState<any[]>([]); // Store full document data
  const [loading, setLoading] = useState(true); // Loading state
  const [user] = useAuthState(auth);
  

   const handleAddToFavorites = async (id: string) => {
     try {
       if (!user) {
         console.log("No user is logged in.");
         return;
       }

       // Query the user document by email
       const usersRef = collection(db, "users");
       const q = query(usersRef, where("email", "==", user.email));
       const querySnapshot = await getDocs(q);

       if (querySnapshot.empty) {
         console.log("No user document found for email:", user.email);
         return;
       }

       const userDoc = querySnapshot.docs[0]; // Get the user's document
       const userDocRef = doc(db, "users", userDoc.id); // Reference to the user document

       // Create a reference to the car document
       const carRef = doc(db, "car", id);

       // Add the car reference to the user's favorites
       await updateDoc(userDocRef, {
         favorites: arrayUnion(carRef),
       });

       console.log(`Car with ID: ${id} added to favorites.`);
     } catch (err) {
       console.error("Error adding car to favorites:", err);
     }
   };


  const getFavorites = async () => {
    try {
      if (!user) {
        console.log("No user is logged in.");
        return;
      }

      // Query to find the user document by email
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No user document found for email:", user.email);
        return;
      }

      const userData = querySnapshot.docs[0].data() as User;

      const favoriteRefs = userData?.favorites || [];
      // Fetch each favorite document
      const favoriteDocs = await Promise.all(
        favoriteRefs.map(async (favoriteRef) => {
          const favoriteDoc = await getDoc(favoriteRef);
          return favoriteDoc.exists()
            ? { id: favoriteDoc.id, ...favoriteDoc.data() }
            : null;
        })
      );

      // Filter out nulls and update the state
      setUserFavorites(favoriteDocs.filter((doc) => doc !== null));
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false); // Ensure loading state is cleared
    }
  };

  useEffect(() => {
    getFavorites();
  }, [user]);


  if (loading) {
    return <div>Loading your favorites...</div>; // Loading indicator
  }

  return (
    <div className="favorites-container">
      <h2>Your Favorites</h2>
      {userFavorites.length > 0 ? (
        <ul>
          {userFavorites.map((favorite) => (
            <Post post={favorite} handleAddToFavorites={handleAddToFavorites} />
          ))}
        </ul>
      ) : (
        <p>No favorites found.</p> // Message for empty favorites
      )}
    </div>
  );
};

export default Favorites;
