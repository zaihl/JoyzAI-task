import React from "react";

function TodoControls({
    hasTodos,
    currentFilter,
    setFilter,
    currentSort,
    setSort,
    clearCompleted,
    activeCount,
}) {
    if (!hasTodos) {
        return (
            <div className="todo-controls empty">
                <span className="todo-count-empty">
                    Add tasks to get started!
                </span>
            </div>
        );
    }
    const showClearCompletedButton = hasTodos && currentFilter !== "active";

    return (
        <div className="todo-controls">
            <div className="controls-left">
                <span className="todo-count">{activeCount} items left</span>
            </div>
            <div className="controls-center">
                <label htmlFor="filter-select" className="visually-hidden">
                    Filter tasks
                </label>
                <select
                    id="filter-select"
                    value={currentFilter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="control-select"
                    title="Filter tasks"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>

                <label htmlFor="sort-select" className="visually-hidden">
                    Sort tasks
                </label>
                <select
                    id="sort-select"
                    value={currentSort}
                    onChange={(e) => setSort(e.target.value)}
                    className="control-select"
                    title="Sort tasks"
                >
                    <option value="default">Default</option>
                    <option value="dueDate">By Due Date</option>
                    <option value="priority">By Priority</option>
                </select>

            </div>
            <div className="controls-right">
                {showClearCompletedButton && (
                    <button
                        onClick={clearCompleted}
                        className="clear-completed-btn"
                    >
                        Clear Completed
                    </button>
                )}
            </div>
        </div>
    );
}

export default TodoControls;