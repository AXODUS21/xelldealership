import addIcon from "../addons/add-icon.png";
import "../css/Store.css";

const PostCar = ({setFormVisibility}: any) => {
  // next step:(take out the formVisibility so you can put it into the body of the website)

  const showForm = () => {
    setFormVisibility(((prev:boolean) => !prev))
  }

  return (
    <>
    <div onClick={showForm} className="add-car">
      <img className="add-icon" src={addIcon}/>
    </div>
    </>
  );
}

export default PostCar