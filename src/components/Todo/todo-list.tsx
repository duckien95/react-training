import TodoItem from "../TodoItem/todo-item.tsx";
import TodoFilter from "../TodoFilter/todo-filter.tsx";
import TodoInput from "../TodoInput/todo-input.tsx";
import { TodoListProps } from "../../models/Todo/todo.interface";
import { useTodoService } from "../../services/todo-list/useTodo.ts";
import React from "react";

const TodoList: React.FC<TodoListProps> = ({ placeholder = "What needs to be done?", pageTitle = "Todos" }) => {
    console.log('TodoList re-render')

    const { 
        getListDisplayTodo,
        clearAllCompleted,
        completeAllTodo,
        addTodoItem,
        onCompleteItem,
        onUpdateItem,
        onDeleteItem,
        displayType,
        setDisplayType,
        listCurrentTodo
    } = useTodoService();

    const renderTodoItems = () => {
        return (
            getListDisplayTodo()
                .map((item) => {
                    return <TodoItem 
                                todoData={item} 
                                key={item.id}
                                onDeleteItem={onDeleteItem} 
                                onCompleteItem={onCompleteItem} 
                                onUpdateItem={onUpdateItem}
                            ></TodoItem>
                })
        );
    }

    // Your code start here
    return (
        <div className="todo">
            <h1>{pageTitle}</h1>
            <TodoInput
                placeholder={placeholder}
                listCurrentTodo={listCurrentTodo} 
                addTodoItem={addTodoItem}
                completeAllTodo={completeAllTodo}
            ></TodoInput>
            <div className="todo__body">
                <ul className="todo__list">
                    {listCurrentTodo && renderTodoItems()}
                </ul>
            </div>
            <TodoFilter
                displayType={displayType} 
                setDisplayType={setDisplayType} 
                listCurrentTodo={listCurrentTodo} 
                clearAllCompleted={clearAllCompleted} 
                getListDisplayTodo={getListDisplayTodo}
            ></TodoFilter>
        </div>
    )
    // Your code end here
};

export default TodoList;