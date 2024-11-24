import '../css/Store.css'
import PostCar from '../components/create-car-post';
import { auth, db } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useState, useEffect} from 'react'
import CarPostForm from '../components/car-post-form';
import Post from '../components/post';
import {
  doc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  collection
} from "firebase/firestore";


export interface Post {
  id: string;
  carName: string;
  photo:string,
  price: number;
  details: string;
  ownerName: string;
  contact: number;
}

export interface Image{
  img: Image[];
}

const Store = () => {
  const [user] = useAuthState(auth)
  const [formVisibility, setFormVisibility] = useState(false);
  const [carList, setCarList] = useState<Post[] | null>(null);
  const carPostRef = collection(db, "car");
  let adminUid = 'thL6aqQoFSaPQGM5d7jHsivgJMG3';
  
  const getPosts =async () => {
    const data = await getDocs(carPostRef)
    setCarList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
  }
  
  useEffect(() => {
    getPosts()
  }, [])

  const handleAddToFavorites = async (id: string) => {
    try {
      if (!user) {
        alert("No user is logged in.");
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

  
  return (
    <div className="store-container">
      <div className="store-header">
        <h1 className="store-sign">STORE</h1>
      </div>
      
      {formVisibility && (
        <div className="car-form-container">
          <CarPostForm
            setFormVisibility={setFormVisibility}
          />
        </div>
      )}

      <div className="car-container">
        {user?.uid === adminUid && (
          <PostCar setFormVisibility={setFormVisibility} />
        )}
                
        {carList?.map((post) => (
          <Post post={post} handleAddToFavorites={handleAddToFavorites}/>
        ))}
      </div>
    </div>
  );
}

export default Store