import './App.css';
import TodoList from './components/Todo/todo-list.tsx';

function App() {
  return (
    <div className="App">
      <TodoList todoList={[]}></TodoList>
    </div>
  );
}

export default App;
