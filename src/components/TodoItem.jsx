import React, { useState } from "react";

const priorityMap = { P1: "High", P2: "Medium", P3: "Low", P4: "None" };
const priorityOptions = [
    { value: "P1", label: "Priority 1" },
    { value: "P2", label: "Priority 2" },
    { value: "P3", label: "Priority 3" },
    { value: "P4", label: "Priority 4 (Low)" },
];

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");
    const [editPriority, setEditPriority] = useState(todo.priority || "P4");

    const handleUpdate = () => {
        if (editText.trim() === "") return;
        updateTodo(todo.id, {
            text: editText.trim(),
            dueDate: editDueDate,
            priority: editPriority,
        });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditText(todo.text);
        setEditDueDate(todo.dueDate || "");
        setEditPriority(todo.priority || "P4");
    };

    const isOverdue =
        todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

    if (isEditing) {
        return (
            <li className="todo-item editing">
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-main-task"
                />
                <div className="edit-meta">
                    <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        title="Edit Due Date"
                    />
                    <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                        title="Edit Priority"
                    >
                        {priorityOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="todo-actions">
                    <button onClick={handleUpdate} className="save-btn">
                        Save
                    </button>
                    <button onClick={handleCancelEdit} className="cancel-btn">
                        Cancel
                    </button>
                </div>
            </li>
        );
    }

    return (
        <li
            className={`todo-item ${
                todo.completed ? "completed" : ""
            } priority-${todo.priority.toLowerCase()}`}
        >
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="todo-checkbox"
                    title={
                        todo.completed
                            ? "Mark as incomplete"
                            : "Mark as complete"
                    }
                />
                <div
                    className="todo-details"
                    onClick={() => setIsEditing(true)}
                    title="Click to edit task"
                >
                    <span className="todo-text">{todo.text}</span>
                    <div className="todo-meta">
                        {todo.dueDate && (
                            <span
                                className={`meta-duedate ${
                                    isOverdue ? "overdue" : ""
                                }`}
                                title={`Due: ${new Date(
                                    todo.dueDate
                                ).toLocaleDateString()}`}
                            >
                                📅{" "}
                                {new Date(todo.dueDate).toLocaleDateString(
                                    "en-CA"
                                )}
                            </span>
                        )}
                        {todo.priority && todo.priority !== "P4" && (
                            <span
                                className={`meta-priority priority-tag-${todo.priority.toLowerCase()}`}
                                title={`Priority: ${
                                    priorityMap[todo.priority]
                                }`}
                            >
                                ❗ {priorityMap[todo.priority]}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="todo-actions">
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                    Edit
                </button>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;