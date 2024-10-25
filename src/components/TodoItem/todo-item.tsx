import React, { useRef, useEffect } from "react";
import "../../styles/todo-list/todo-list.scss";
import { TodoItemProps } from "../../models/Todo/todo.interface";
import { useTodoListStore } from "../../context/todo-list/todo-list.store.ts";

const TodoItem: React.FC<TodoItemProps> = ({ todoData, onCompleteItem, onDeleteItem, onUpdateItem }) => {
    console.log('[===========CHILDREN===========] TodoItem re-render');
    const inputRef = useRef(null);

    // get state from todo list store
    const editedTodoId = useTodoListStore((state: any) => state.editedTodoId);
    const setEditedTodoId = useTodoListStore((state: any) => state.setEditedTodoId);

    const onDoubleClick = () => {
        setEditedTodoId(todoData.id);
    }

    useEffect(() => {
        inputRef.current && (inputRef.current as HTMLInputElement).focus();
    });

    const onBlurInput = (evt: React.FocusEvent<HTMLInputElement>) => {
        evt.target.value = todoData.title;
        setEditedTodoId("");
    }

    const isEditingMode = editedTodoId === todoData.id;
    const inputCheckboxId = `checkbox-${todoData.id}`;

    // Your code start here
    return (
        <li className={`todo__item ${isEditingMode ? 'edit-mode' : ''}`}>
            <input className={isEditingMode ? "todo__item--edit" : "d-none"}
                ref={inputRef}
                type="text" 
                defaultValue={todoData.title} 
                onKeyDown={(evt) => onUpdateItem(evt, todoData.id)} 
                onBlur={onBlurInput}
            ></input>
            <div className={`${isEditingMode ? "d-none" : "todo__item--infor"} ${todoData.isCompleted ? "todo__item--infor-completed" : ""} `}>
                <input className="todo__item--checkbox d-none"
                    id={inputCheckboxId}
                    type="checkbox" 
                    checked={todoData.isCompleted} 
                    onChange={(evt) => onCompleteItem && onCompleteItem(evt, todoData.id)}
                ></input>
                <label htmlFor={inputCheckboxId} aria-labelledby={inputCheckboxId} className="todo__item--label"></label>
                <p className="todo__item--title" onDoubleClick={onDoubleClick}>{todoData.title}</p>
                <button className="todo__item--delete-todo d-none" onClick={() => onDeleteItem(todoData.id)}></button>
            </div>
        </li>

    )
    // Your code end here
};

export default TodoItem;

