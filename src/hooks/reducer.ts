type State = {
  curryRice: number;
  porkCutlet: number;
  cheese: number;
};

type Action =
  | {
      type: 'arrival'; // 入荷
      payload: {
        curryRice: number;
        porkCutlet: number;
        cheese: number;
      };
    }
  | {
      type: 'orderCurryRice'; // カレーライスの注文
    }
  | {
      type: 'orderPorkCutletCurry'; // カツカレーの注文
    }
  | {
      type: 'orderCheeseCurry'; // チーズカレーの注文
    }
  | {
      type: 'orderCheesePorkCutletCurry'; // チーズカツカレーの注文
    };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'arrival':
      return {
        curryRice: state.curryRice + action.payload.curryRice,
        porkCutlet: state.porkCutlet + action.payload.porkCutlet,
        cheese: state.cheese + action.payload.cheese,
      };
    case 'orderCurryRice':
      return {
        ...state,
        curryRice: state.curryRice - 1,
      };
    case 'orderPorkCutletCurry':
      return {
        ...state,
        curryRice: state.curryRice - 1,
        porkCutlet: state.porkCutlet - 1,
      };
    case 'orderCheeseCurry':
      return {
        ...state,
        curryRice: state.curryRice - 1,
        cheese: state.cheese - 1,
      };
    case 'orderCheesePorkCutletCurry':
      return {
        curryRice: state.curryRice - 1,
        porkCutlet: state.porkCutlet - 1,
        cheese: state.cheese - 1,
      };
  }
}
