import CreateForm from './form'

const CarPostForm = ({setFormVisibility}: any) => {

  const closeForm = () => {
    setFormVisibility(((prev: boolean) => !prev))
  }

  return (
    <div className="pop-up">
      <div onClick={closeForm} className="pop-up-header">
        <button className="close-button">X</button>
      </div>
      <div className="form-container">
        <CreateForm />
      </div>
    </div>
  );
}

export default CarPostForm