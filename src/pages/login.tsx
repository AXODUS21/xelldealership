import "../css/Login.css";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);

    try {
      // Check if the user already exists in the "users" collection
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", result.user.email)
      );
      const userSnapshot = await getDocs(userQuery);

      // If the user doesn't exist, add them to the collection
      if (userSnapshot.empty) {
        await addDoc(collection(db, "users"), {
          email: result.user.email,
          favorites: [],
          username: result.user.displayName,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="Login">
      <div className="login-sign-container">
        <h1 className="login-sign">Login</h1>
      </div>
      <div className="login-container">
        <button onClick={signInWithGoogle} className="login-layout">
          Log In With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
