import { useEffect, useEffectEvent, useState } from "react";
import TaskForm from "./TaskForm";

const HomeApp = ({token}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const effectEventFetchTasks = useEffectEvent(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/task",{
        headers:{
          "x-auth-token" : token
        }
      });
      const data = await response.json();
     setLoading(false);
     if (response.ok) {
       setTasks(data);
     } else {
       console.error("Task fetch failed");
     }

    } catch (error) {
      console.log(`Error hua: ${error.message}`);
      setLoading(false);
    }
  });

  useEffect(() => {
   if(token){
     effectEventFetchTasks();
   }
  }, [token]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are You Sure?");

    if (!isConfirmed) return;

    const response = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "DELETE",
      headers:{
        "x-auth-token": token,
      }
    });

  if (!response.ok) {
    alert("Delete failed");
    return;
  }

  setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const toggleStatus = async (id, currStatus) => {
    const newStatus = currStatus === "pending" ? "completed" : "pending"; // toggle

    const response = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" , "x-auth-token": token},
      body: JSON.stringify({ status: newStatus }),
    });

     if (!response.ok) {
       alert("Status update failed");
       return;
     }

     setTasks((prev) =>
       prev.map((task) =>
         task._id === id ? { ...task, status: newStatus } : task,
       ),
     );

  };

  return (
    <div>
      <h1>MERN Task Manager</h1>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <TaskForm token={token} setTasks={setTasks} />
          <div className="box" style={{ backgroundColor: "black" }}>
            {tasks &&
              tasks.map((task) => (
                <div
                  className="taskBox"
                  key={task._id}
                  style={{ backgroundColor: "green" }}
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => toggleStatus(task._id, task.status)}
                    style={{ marginRight: "10px" }}
                    // name="status" id="status"
                  />

                  <h3
                    style={{
                      textDecoration:
                        task.status === "completed" ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </h3>
                  <p>{task.description}</p>
                  <p>{task.status}</p>
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeApp;
