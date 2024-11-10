import '../css/Login.css'
import { auth, provider } from '../config/firebase'
import { signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth,provider)
    console.log(result)
    navigate('/')
  }

  return (
    <div className="Login">
      <div className='login-sign-container'>
        <h1 className="login-sign">Login</h1>
      </div>
      <div className="login-container">
        <button onClick={signInWithGoogle} className="login-layout">Log In With Google</button>
      </div>
    </div>
  );
}

export default Login