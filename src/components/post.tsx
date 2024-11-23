import { Post as carPost } from "../pages/store";
import bookmarkwhite from "../addons/bookmark-white.png";
import bookmark from "../addons/bookmark.png"
import { useFavorites } from "../config/globals"; 
import { db } from "../config/firebase";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Props {
  post: carPost;
  handleAddToFavorites: (id: string) => void; // Specify the type of the function
}

const Post = (props: Props) => {
  const { post } = props;
  const [togglePopUp, setTogglePopUp] = useState(false)
  const { userFavorites, addToFavorites, removeFromFavorites } = useFavorites();

  // Debug to verify live updates
  useEffect(() => {
    console.log("Updated userFavorites:", userFavorites);
  }, [userFavorites]);

  const isFavorite = userFavorites.some((favorite) => favorite.id === post.id);

  const handleFavoriteToggle = async () => {
    const favoriteRef = doc(db, "car", post.id);
    if (isFavorite) {
      await removeFromFavorites(favoriteRef);
    } else {
      await addToFavorites(favoriteRef);
    }
  };

  return (
    <div className="added-car" key={post.id}>
      <div className="car-image">
        <img src={post.photo} alt={`${post.carName} image`} />
      </div>
      <div className="car-details">
        <div className="NameNPrice">
          <h4>{post.carName}</h4>
          <p>${post.price}</p>
          <h6>Owner: {post.ownerName}</h6>
          {!togglePopUp ? (
            <button onClick={() => setTogglePopUp(!togglePopUp)} className="view-more-btn">
              <a href="#">
                <span>SEE MORE</span>
              </a>
            </button>
          ) : (
            <>
              <div className="details-n-contact">
                <div className="">Owner Number: {post.contact}</div>
                <div>{post.details}</div>

              </div>
            </>
          )}
        </div>

        <button className="add-to-fav-button" onClick={handleFavoriteToggle}>
          <img
            src={isFavorite ? bookmark : bookmarkwhite}
            alt={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          />
        </button>
      </div>
    </div>
  );
};

export default Post;