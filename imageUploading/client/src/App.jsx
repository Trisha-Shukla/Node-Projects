import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [form, setForm] = useState({
    title:"",
    author:"",
    price:"",
    descriotion:"",
    image:""
  })

  const handleChange=(e)=>{
    const {name,value}=e.target;
    if(name==='image') 
      {setForm({...form,image:e.target.files[0]})
    console.log(e.target.files[0]);
    
  
  }
    else setForm({...form,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(form)
    const formData=new FormData();

    formData.append("title",form.title)
    formData.append("author",form.author)
    formData.append("descriotion",form.descriotion)
    formData.append("price",form.price)
    formData.append("image",form.image)

    const response=await axios.post("https://image-uploading-ts.onrender.com/api/add",formData);
    console.log(response.data)
  }

  return (
    <>
      <form onSubmit={handleSubmit} encType='multipart/form-data' action="" >
        <input type="text" placeholder='title' name='title' value={form.title} onChange={handleChange}/> <br />
        <input type="text" placeholder='author' name='author' value={form.author} onChange={handleChange}/> <br />
        <input type="text" placeholder='price' name='price' value={form.price} onChange={handleChange}/> <br />
        <input type="text" placeholder='description' name='descriotion' value={form.descriotion} onChange={handleChange}/> <br />
        <input type="file"  name='image' onChange={handleChange} /> <br />
        <button type='submit'>Add book</button>
      </form>
    </>
  )
}

export default App
