import { Post as carPost } from "../pages/store"

interface Props {
    post: carPost;
}

const Post = (props : Props) => {

    
    const {post,} = props;
  return (
    <div className="added-car">
      <div className="car-image">
        <img src={post.photo}/>
      </div>
      <div className="car-name">
        <h1>
          Car: {post.carName}
        </h1>
      </div>
      <div className="car-price">
        Price: 
        &#x20b1;{post.price}
      </div>
      <div className="car-description">
        Details: {post.details}
      </div>
      <div className="car-owner">
        Owner: {post.ownerName}
      </div>
      <div className="owner-contact">
        Contact: {post.contact}
      </div>

    </div>
  )
}

export default Post