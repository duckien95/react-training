import { TodoStatus } from "../../utils/variables/todo-status.ts";
import { TodoFilterProps } from "../../models/Todo/todo.interface.ts";
import React from "react";

const renderText = (listDisplayTodo: any) =>  {
    return `${listDisplayTodo.length} ${listDisplayTodo.length == 1 ? 'item' : 'items'} left!!!`;
};

const TodoFilter: React.FC<TodoFilterProps> = ({displayType, setDisplayType, listCurrentTodo, clearAllCompleted, getListDisplayTodo}) => {

    return (
        !!listCurrentTodo.length && 
        <div className="todo__footer">
            <div className="">{listCurrentTodo && renderText(getListDisplayTodo())}</div>
            <div className="todo__filter">
                <button className={`todo__filter--item ${displayType == TodoStatus.All ? 'active' : ''}`} onClick={() => setDisplayType(TodoStatus.All)}>All</button>
                <button className={`todo__filter--item ${displayType == TodoStatus.Active ? 'active' : ''}`} onClick={() => setDisplayType(TodoStatus.Active)}>Active</button>
                <button className={`todo__filter--item ${displayType == TodoStatus.Complete ? 'active' : ''}`} onClick={() => setDisplayType(TodoStatus.Complete)}>Complete</button>
            </div>
            <button className="" onClick={clearAllCompleted}>Clear Completed</button>
        </div>
    )
}

export default TodoFilter;