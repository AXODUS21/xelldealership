import '../css/Home.css'
import "bootstrap/dist/css/bootstrap.min.css";
import video from '../addons/carVid.mp4'


const Home = () => {
 return (
   <body>
     <div className="home-container">
       <video src={video} autoPlay muted loop />
       <div className="home-text">HOME</div>
       <div className='home-detail-container'>
         <p className="home-details">
           Nothing but quality. Get the best for the lowest
         </p>
       </div>
     </div>
   </body>
 );
}


export default Home