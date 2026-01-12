import { useState } from "react";

const TaskForm = () => {

  const initialState = {
    title:"",
    description:"",
    error: null,
  }

  const [form, setForm] = useState(initialState)

  const handleChange= (e)=>{
    const {name, value} = e.target;

    setForm(prev=>(
      {
        ...prev,
        [name]: value,
      }
    ))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const task = { title: form.title, description: form.description};

    const response = await fetch ( " http://localhost:3000/api/task",{
      method: "POST",
      body: JSON.stringify(task),
      headers:{
        "Content-Type": "application/json"
      }
    });

    const json = await response.json();

    if (!response.ok) {
     
  setForm(prev => {
    return {
      ...prev,
      error: json.error
    };
  });
}

if(response.ok){
 setForm(initialState);
 console.log(`naya taks add: ${json}`);

 //window reload temporary
 window.location.reload();
}

  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h3>Add New Task</h3>
      <label htmlFor="title">Task Title:</label>
      <input type="text" name="title" id="title" value={form.title} onChange={handleChange} />
      {/* //agar object wala usestae nahi hota toh onChange={((e)=>setTitle(e.target.value))} karnte normak usestate bna ke  */}


      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" value={form.description} onChange={handleChange} />

      <button  style={{cursor:"pointer"}}>Add Task</button>

    {
      form.error && <div style={{backgroundColor:"red"}}> {form.error}</div>
    }



      </form>
    </div>
  )
}

export default TaskForm;
