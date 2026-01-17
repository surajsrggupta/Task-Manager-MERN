import { useState } from "react";

const TaskForm = ({ token, setTasks }) => {
  const initialState = {
    title: "",
    description: "",
    error: null,
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value, error: null }));
  };

  // ---------------- ADD NORMAL TASK ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      return setForm((prev) => ({
        ...prev,
        error: "All fields are required",
      }));
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/task/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Task create failed");

      setTasks((prev) => [data, ...prev]);
      setForm(initialState);
    } catch (err) {
      setForm((prev) => ({ ...prev, error: err.message }));
    } finally {
      setLoading(false);
    }
  };

  // ---------------- ADD AI TASKS ----------------
  const generateAiTask = async () => {
    if (!form.title.trim()) return alert("Pehle topic likho");

    try {
      setAiLoading(true);

      const res = await fetch("http://localhost:3000/api/ai-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ prompt: form.title.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !Array.isArray(data.tasks)) {
        throw new Error(data.error || "AI response invalid");
      }

      // Save all AI tasks together
      const savedTasks = await Promise.all(
        data.tasks.map(async (taskTitle) => {
          const taskRes = await fetch("http://localhost:3000/api/task/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify({
              title: taskTitle.trim(),
              description: `AI generated task for ${form.title}`,
            }),
          });

          if (!taskRes.ok) throw new Error("Failed to save AI task");
          return taskRes.json();
        }),
      );

      setTasks((prev) => [...savedTasks, ...prev]);
      setForm(initialState);
    } catch (err) {
      console.error("AI Error:", err);
      alert(err.message || "AI thak gaya 😵");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      {form.error && <p className="error">{form.error}</p>}

      <button disabled={loading}>{loading ? "Adding..." : "Add Task"}</button>

      <button type="button" onClick={generateAiTask} disabled={aiLoading}>
        {aiLoading ? "AI soch raha..." : "Generate using AI"}
      </button>
    </form>
  );
};

export default TaskForm;
