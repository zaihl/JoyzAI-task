import React, { useState } from "react";

const priorityOptions = [
    { value: "P1", label: "Priority 1" },
    { value: "P2", label: "Priority 2" },
    { value: "P3", label: "Priority 3" },
    { value: "P4", label: "Priority 4 (Low)" },
];

function TodoForm({ addTodo }) {
    const [text, setText] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("P4");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "") return;
        addTodo({ text, dueDate, priority });
        setText("");
        setDueDate("");
        setPriority("P4");
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-main-input">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Buy milk"
                    className="task-input"
                />
                <button type="submit" className="add-task-btn">
                    Add Task
                </button>
            </div>
            <div className="form-meta-inputs">
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="date-input"
                    title="Due Date"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="priority-select"
                    title="Priority"
                >
                    {priorityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    );
}

export default TodoForm;