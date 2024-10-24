import React from "react";
import { TodoInputProps } from "../../models/Todo/todo.interface";

const TodoInput: React.FC<TodoInputProps> = ({placeholder, addTodoItem, listCurrentTodo, completeAllTodo}) => {
    return (
        <div className="todo__header">
                <input type="text" 
                    placeholder={placeholder}
                    className="todo__header--input-title" 
                    onKeyDown={addTodoItem}
                ></input>
                {
                    !!listCurrentTodo.length &&
                    <div className="todo__header--complete-action">
                        <input id="btn-complete-all-todo" className="todo__header--complete-checkbox d-none" type="checkbox" onChange={completeAllTodo}></input>
                        <label htmlFor="btn-complete-all-todo" className="todo__header--complete-all"></label>
                    </div>
                }
            </div>
    )
}

export default TodoInput;