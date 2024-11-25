import { useReducer, useState } from 'react';

// Reducer関数：アクションに応じてToDoリストの状態を更新
function todoReducer(todos, action) {
  console.log('todos: ', todos);
  console.log('action: ', action);
  switch (action.type) {
    case 'add':
      return [...todos, { id: Date.now(), text: action.text }];
    case 'delete':
      return todos.filter((todo: string) => todo.id !== action.id);
    default:
      throw new Error('Unknown action type');
  }
}

// TodoAppコンポーネント：ToDoリストのUIとロジックを管理
export default function TodoApp() {
  // useReducerでToDoリストの状態を管理 初期値は空のリスト
  const [todos, dispatch] = useReducer(todoReducer, []);

  // 入力されたテキストの状態を管理
  const [text, setText] = useState('');

  // タスクを追加する関数：テキストが空でない場合にdispatchを実行
  const handleAdd = () => {
    if (text.trim()) {
      dispatch({ type: 'add', text });
      setText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="タスクを入力してください"
      />
      <button
        type="button"
        onClick={handleAdd}
      >
        Add Task
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}

            {/* タスクを削除するためのボタン：クリックでdispatchを実行 */}
            <button
              type="button"
              onClick={() => dispatch({ type: 'delete', id: todo.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
