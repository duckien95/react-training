import { useState, useRef, useEffect } from "react";
import { TodoStatus } from "../../utils/variables/todo-status.ts";
import { TodoData } from "../../models/Todo/todo.interface";
import { useTodoListStore } from "../../context/todo-list/todo-list.store.ts";

export const useTodoService = () => {
    const [displayType, setDisplayType] = useState(TodoStatus.All);
    const [listCurrentTodo, setListCurrentTodo] = useState<TodoData[]>([]);
    // get state from todo list store
    const setEditedTodoId = useTodoListStore((state: any) => state.setEditedTodoId);

    const STORAGE_KEY_TODO_LIST = "todo-mvc-list";

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            try {
                const storageValue = JSON.parse(localStorage.getItem(STORAGE_KEY_TODO_LIST) || "[]");
                if(Array.isArray(storageValue)) {
                    setListCurrentTodo(storageValue);
                }
            } catch (error) {
                console.log(error);
            }
        }
        return () => {
          firstRender.current = false;
        }
    }, [listCurrentTodo]);

    const getListDisplayTodo = () => {           
        return listCurrentTodo.filter(item => {
            return  displayType == TodoStatus.All 
                || (displayType == TodoStatus.Active && item.type == displayType && !item.isCompleted)
                || (displayType == TodoStatus.Complete && item.isCompleted);   
            }
        )
    };

    const updateTodoList = (listTodo: TodoData[]) => {
        setListCurrentTodo([...JSON.parse(JSON.stringify(listTodo))]);
        localStorage.setItem(STORAGE_KEY_TODO_LIST, JSON.stringify(listTodo));
    }

    const clearAllCompleted = () => {
        updateTodoList(listCurrentTodo.filter(item => {    
            return !item.isCompleted;
        }));
    }

    const completeAllTodo = () => {
        const listCompleted = listCurrentTodo.filter(item => item.isCompleted);
        const flagComplete = listCompleted.length != listCurrentTodo.length;
        listCurrentTodo.forEach(item => item.isCompleted = flagComplete);
        updateTodoList(listCurrentTodo);
    }

    const addTodoItem = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const targetEl = evt.target as HTMLInputElement;
        const todoName = targetEl.value;
        if(evt.key === 'Enter' && todoName.trim()) {
            // add new todo to list after user press on enter button
            const newTodo = {
                type: TodoStatus.Active,
                title: todoName.trim(),
                id: new Date().getTime().toString(),
                isCompleted: false
            };
            updateTodoList([...listCurrentTodo, newTodo]);
            // reset input value
            targetEl.value = "";
        }
    }

    const onCompleteItem = (evt: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        let index = listCurrentTodo.findIndex(item => {return item.id == todoId});
        if(index > -1) {
            // update new status for todo item
            listCurrentTodo[index].type = evt.target.checked ? TodoStatus.Complete : TodoStatus.Active;
            listCurrentTodo[index].isCompleted = evt.target.checked;
            updateTodoList(listCurrentTodo);
        }
    }

    const onUpdateItem = (evt: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
        const index = listCurrentTodo.findIndex(item => {return item.id == todoId});
        const newTitle = (evt.target as HTMLInputElement).value.trim();
        if(evt.key === 'Enter' && index > -1 && newTitle) {
            // update new title for todo item after user press on enter button
            listCurrentTodo[index].title = newTitle;
            updateTodoList(listCurrentTodo);
            setEditedTodoId("");
        }
    }

    const onDeleteItem = (todoId: string) => {
        let index = listCurrentTodo.findIndex(item => {return item.id == todoId});
        if(index > -1) {
            // remove todo item from list
            listCurrentTodo.splice(index, 1);
            updateTodoList(listCurrentTodo);
        }
    }

    return {
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
    }
}