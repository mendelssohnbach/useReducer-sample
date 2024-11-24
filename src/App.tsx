import { MouseEvent, useReducer } from 'react';
import './App.css';
import { reducer } from './hooks/reducer';

const initialState = {
  curryRice: 20,
  porkCutlet: 10,
  cheese: 10,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onClickArrival = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({
      type: 'arrival',
      payload: { curryRice: 10, porkCutlet: 5, cheese: 5 },
    });
  };

  const onClickOrderCurryRice = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: 'orderCurryRice' });
  };

  const onClickOrderPorkCutletCurry = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: 'orderPorkCutletCurry' });
  };

  const onClickOrderCheeseCurry = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: 'orderCheeseCurry' });
  };

  const onClickOrderCheesePorkCutletCurry = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: 'orderCheesePorkCutletCurry' });
  };

  return (
    <>
      <div style={{ margin: '30px', padding: '30px', border: 'solid' }}>
        <h1>在庫管理</h1>
        <h2>各種在庫</h2>
        <ul>
          <li>カレールー: {state.curryRice}個</li>
          <li>とんかつ: {state.porkCutlet}個</li>
          <li>チーズ: {state.cheese}個</li>
        </ul>

        <h2>操作</h2>
        <div style={{ margin: '10px' }}>
          <button onClick={onClickArrival}>入荷</button>
        </div>
        <div style={{ margin: '10px' }}>
          <button onClick={onClickOrderCurryRice}>注文: カレーライス</button>
          <button onClick={onClickOrderPorkCutletCurry}>注文: カツカレー</button>
          <button onClick={onClickOrderCheeseCurry}>注文: チーズカレー</button>
          <button onClick={onClickOrderCheesePorkCutletCurry}>注文: チーズカツカレー</button>
        </div>
      </div>
    </>
  );
}

export default App;
