import '../App.css' 
import {Link} from 'react-router-dom'
import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from 'firebase/auth'

const Navbar = () => {
   const [user] = useAuthState(auth);

      const signUserOut = async () => {
        await signOut(auth);
        console.log(user)
      };

  return (
    <header>
      <div className="right-side">
        <Link to="/">HOME</Link>
        <Link to="/store">STORE</Link>
        {user ? (
          <Link to="/favorites">
            FAVORITES
          </Link>
        ) : null}
        
        {user ? (
          <div onClick={signUserOut} className="user-info-container">
            <img className='user-photo' src={user?.photoURL || ""} />
            <p className='user-name'> {user?.displayName} </p>
          </div>
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
      </div>
    </header>
  );
}

export default Navbar