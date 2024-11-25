import { useReducer } from 'react';

const initialState = { items: [] };

function reducer(state, action) {
  console.log('state: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'addItem':
      return { items: [...state.items, action.payload] };
    case 'removeItem':
      return { items: state.items.filter((item) => item.id !== action.payload) };
    case 'clearItems':
      return { items: [] };
    default:
      return state;
  }
}

const ItemManager = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button
        type="button"
        onClick={() => dispatch({ type: 'addItem', payload: { id: 1, name: 'アイテム1' } })}
      >
        アイテムを追加
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'removeItem', payload: 1 })}
      >
        アイテムを削除
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'clearItems' })}
      >
        すべてクリア
      </button>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemManager;
