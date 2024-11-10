import '../css/Store.css'
import PostCar from '../components/create-car-post';
import { auth, db } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useState, useEffect} from 'react'
import CarPostForm from '../components/car-post-form';
import {getDocs, collection} from 'firebase/firestore'
import Post from '../components/post';



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
            <Post post={post} />
          ))}

      </div>
    </div>
  );
}

export default Store