import { useEffect, useEffectEvent, useState } from "react";
import TaskForm from "./TaskForm";

const HomeApp = () => {

    const [tasks, setTasks] = useState(null);

    const effectEventFetchTasks = useEffectEvent(async()=>{
        try {
            const response = await fetch("http://localhost:3000/api/task");
            const data = await response.json();
            if(response.ok){
                setTasks(data);
            }
        } catch (error) {
            console.log(`Error hua: ${error.message}`);
        }
    })

    useEffect(()=>{

        effectEventFetchTasks();

    },[])

    const handleDelete = async(id)=>{

        const response = await fetch(`http://localhost:3000/api/task/${id}`,{
            method:"DELETE"      
          });

          if(response.ok){
            setTasks(tasks.filter((task)=>task._id != id));
          }


        

    }

  return (
    <div>
        <h1>MERN Task Manager</h1>
            <TaskForm/>
        <div style={{backgroundColor:"black"}}>
        {tasks && tasks.map((task)=>(
            <div key={task._id} style={{backgroundColor: "green"}}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.status}</p>
                <button onClick={()=>handleDelete(task._id)}>Delete</button>
            </div>
        ))}
        </div>
      
    </div>
  )
}

export default HomeApp
