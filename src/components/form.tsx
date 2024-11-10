import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

interface CreateFormData {
  photo: string;
  carName: string;
  price: number;
  details: string;
  ownerName: string;
  contact: number;
}

const CreateForm = () => {
  const schema = yup.object().shape({
    photo: yup.string().required(),
    carName: yup.string().required(""),
    price: yup.number().required(""),
    details: yup.string().required(""),
    ownerName: yup.string().required(""),
    contact: yup.number().required("").min(11),
  });

  const { register, handleSubmit } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const carPostRef = collection(db, "car"); 

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(carPostRef, {
      ...data,
      photo: data.photo,
      carName: data.carName,
      price: data.price,
      details: data.details,
      ownerName: data.ownerName,
      contact: data.contact,
    });
  };

  return (
    <form className="Form" onSubmit={handleSubmit(onCreatePost)}>
        <h1>Upload A Car</h1>
      <input type="text" placeholder="Car Photo..." {...register("photo")} />
      <input placeholder="Car Name..." {...register("carName")}></input>
      <input placeholder="Price..." {...register("price")}></input>
      <textarea placeholder="Details..." {...register("details")}></textarea>
      <input placeholder="Owner Name..." {...register("ownerName")}></input>
      <input placeholder="Contact..." {...register("contact")}></input>
      <input type="submit"></input>
    </form>
  );
};

export default CreateForm;
