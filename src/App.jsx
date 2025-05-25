import React, { useState, useMemo } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoControls from "./components/TodoControls";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    const addTodo = (todoData) => {
        const newTodo = {
            id: Date.now(),
            text: todoData.text,
            completed: false,
            dueDate: todoData.dueDate || null,
            priority: todoData.priority || "P4",
            createdAt: new Date().toISOString(),
        };
        setTodos([newTodo, ...todos]);
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const updateTodo = (id, updatedFields) => {
        const {...restOfFields } = updatedFields;
        setTodos(
            todos.map(
                (todo) => (todo.id === id ? { ...todo, ...restOfFields } : todo) // Spread only restOfFields
            )
        );
    };

    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const filteredAndSortedTodos = useMemo(() => {
        let processedTodos = [...todos];

        if (filter === "active") {
            processedTodos = processedTodos.filter((todo) => !todo.completed);
        } else if (filter === "completed") {
            processedTodos = processedTodos.filter((todo) => todo.completed);
        }

        switch (sortBy) {
            case "dueDate":
                processedTodos.sort((a, b) => {
                    if (a.completed !== b.completed)
                        return a.completed ? 1 : -1;
                    if (!a.dueDate && !b.dueDate) return 0;
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });
                break;
            case "priority":
                processedTodos.sort((a, b) => {
                    if (a.completed !== b.completed)
                        return a.completed ? 1 : -1;
                    return a.priority.localeCompare(b.priority);
                });
                break;
            case "default":
            default:
                processedTodos.sort((a, b) => {
                    if (a.completed !== b.completed) {
                        return a.completed ? 1 : -1;
                    }
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                break;
        }
        return processedTodos;
    }, [todos, filter, sortBy]);

    const activeCount = todos.filter((todo) => !todo.completed).length;

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>My Tasks</h1>
            </header>
            <section className="todo-adder">
                <TodoForm addTodo={addTodo} />
            </section>
            <section className="todo-toolbar">
                <TodoControls
                    hasTodos={todos.length > 0}
                    currentFilter={filter}
                    setFilter={setFilter}
                    currentSort={sortBy}
                    setSort={setSortBy}
                    clearCompleted={clearCompleted}
                    activeCount={activeCount}
                />
            </section>
            <main className="todo-main-content">
                <TodoList
                    todos={filteredAndSortedTodos}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                />
            </main>
            <footer className="app-footer">
                <p>Stay organized, one task at a time.</p>
            </footer>
        </div>
    );
}

export default App;