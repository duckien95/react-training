import { create } from 'zustand';
import { TodoListStateProps } from '../../models/Todo/todo.interface';

const initialState: TodoListStateProps = {
    editedTodoId: "",
    isCompletedAll: false,
    listIdCompletedAll: []
}

export const useTodoListStore = create((set) => ({
    ...initialState,
    setEditedTodoId: (todoId: string) => set({ editedTodoId: todoId }),
    setIsCompletedAll: (flag: boolean) => set({ isCompletedAll: flag }),
    setListIdCompletedAll: (listId: string[]) => set({ listIdCompletedAll: listId }),
    reset: () => set(initialState),
}))