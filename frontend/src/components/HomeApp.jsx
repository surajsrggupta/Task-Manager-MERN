import { useEffect, useEffectEvent, useState } from "react";
import TaskForm from "./TaskForm";

const HomeApp = () => {

    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);

    const effectEventFetchTasks = useEffectEvent(async()=>{
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/task");
            const data = await response.json();
            if(response.ok){
                setTasks(data);
                setLoading(false);
            }
        } catch (error) {
            console.log(`Error hua: ${error.message}`);
            setLoading(false);
        }
    })

    useEffect(()=>{

        effectEventFetchTasks();

    },[])

    const handleDelete = async(id)=>{
        const isConfirmed = window.confirm("Are You Sure?");

        if(!isConfirmed) return;

        const response = await fetch(`http://localhost:3000/api/task/${id}`,{
            method:"DELETE" ,  
          });

          if(response.ok){
            setTasks(tasks.filter((task)=>task._id != id));
          }

    }

    const toggleStatus = async(id, currStatus)=>{
       
        const newStatus = currStatus=="pending"? "completed":"pending"; // toggle
        
        const response = await fetch(`http://localhost:3000/api/task/${id}`,{
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({status: newStatus})  
        })
         

        if(response.ok){
            setTasks(tasks.map((task)=>(
                task._id ===id?{...task, status: newStatus}:task
            )))
        }
    }

  return (
    <div>
        <h1>MERN Task Manager</h1>

        {loading?(
            <div>
                <div>

                </div>
                <p>Loading...</p>
            </div>
        ):(

  <>
            <TaskForm/>
        <div className="box" style={{backgroundColor:"black"}}>
        {tasks && tasks.map((task)=>(
            <div className="taskBox" key={task._id} style={{backgroundColor: "green"}}>
                <input type="checkbox"
                checked = {task.status==="completed"}
                onChange={()=>toggleStatus(task._id, task.status)}
                style={{marginRight: "10px"}}
                // name="status" id="status"
                  />

                <h3 style={{textDecoration: task.status=="completed"? "line-through":"none"}}>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.status}</p>
                <button onClick={()=>handleDelete(task._id)}>Delete</button>
            </div>
        ))}
        </div>
        </>
      


            
        )
        








    }     
    </div>
  )
}

export default HomeApp
