
import Button from "./Button"
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { useGetData } from "../custom-hooks/FetchData"
import { server_calls } from "../api/server"
import { useDispatch, useStore } from "react-redux"
import { chooseIsbn, chooseAuthor, chooseTitle, chooseGenre } from "../redux/slices/RootSlice"

interface BookAddProps {
  id?: string[];
  onClose: () => void;
  setData: any;
}

const BookForm= ( props:BookAddProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();
  // const {setData}=useGetData();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.first } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 1000);
      event.target.reset()
    } else {
      dispatch(chooseIsbn(data.isbn));
      dispatch(chooseAuthor(data.author));
      dispatch(chooseTitle(data.title));
      dispatch(chooseGenre(data.genre));

      server_calls.create(store.getState())
      // setTimeout(() => {window.location.reload()}, 1000);
      data.id="new"
      
      props.setData((prev:any)=>[...prev,data])

      event.target.reset()

      props.onClose();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">ISBN</label>
          <Input {...register('isbn')} name='isbn' placeholder="Isbn" />
        </div>
        <div>
          <label htmlFor="name">Author Name</label>
          <Input {...register('author')} name='author' placeholder="Author name" />
        </div>
        <div>
          <label htmlFor="name">Title of the Book </label>
          <Input {...register('title')} name='title' placeholder="Title" />
        </div>
        <div>
          <label htmlFor="name">Genre</label>
          <Input {...register('genre')} name='genre' placeholder="Genre" />
        </div>
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BookForm