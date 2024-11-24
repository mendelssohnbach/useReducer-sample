import { useReducer } from 'react';

type TFormData = {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  phone: string;
  age: string;
  password: string;
};

type TErrorState = Record<keyof TFormData, string>;

type TState = TFormData & {
  errors: TErrorState;
};

type TAction =
  | {
      type: 'SET_FIELD';
      field: keyof TState;
      value: string;
    }
  | {
      type: 'SET_ERROR';
      field: keyof TState['errors'];
      value: string;
    };

const validators: Record<keyof TFormData, (value: string) => string> = {
  lastName: (value) => {
    if (value.length < 1) {
      return '姓は必須です';
    }
    return '';
  },
  firstName: (value) => {
    if (value.length < 1) {
      return '名は必須です';
    }
    return '';
  },
  lastNameKana: (value) => {
    if (value.length < 1) {
      return '姓(カナ)は必須です';
    }

    if (!/^[ァ-ヶー]+$/.test(value)) {
      return '全角カタカナで入力してください';
    }
    return '';
  },
  firstNameKana: (value) => {
    if (value.length < 1) {
      return '名（カナ）は必須です';
    }

    if (!/^[ァ-ヶー]+$/.test(value)) {
      return '全角カタカナで入力してください';
    }
    return '';
  },
  email: (value) => {
    if (value.length < 1) {
      return 'メールアドレスは必須です';
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return 'メールアドレスの形式が正しくありません';
    }
    return '';
  },
  phone: (value) => {
    if (value.length < 1) {
      return '電話番号は必須です';
    }

    if (!/[0-9]{10,11}$/.test(value)) {
      return '電話番号は10桁か11桁の数字で入力してください';
    }
    return '';
  },
  age: (value) => {
    if (value.length < 1) {
      return '年齢は必須です';
    }

    if (!/^\d+$/.test(value)) {
      return '年齢は半角数字で入力してください';
    }
    return '';
  },
  password: (value) => {
    if (value.length < 1) {
      return 'パスワードは必須です';
    }

    if (value.length < 8) {
      return 'パスワードは8文字以上で入力してください';
    }
    return '';
  },
};

const initialState: TState = {
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  email: '',
  phone: '',
  age: '',
  password: '',
  errors: {
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    email: '',
    phone: '',
    age: '',
    password: '',
  },
};

const formReducer = (state: TState, action: TAction) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.value },
      };
    default:
      throw new Error(`予期されないアクションタイプが指定されました。`);
  }
};

function FormWithUseReducer() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { errors, ...formData } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof TFormData;
    const fieldValue = e.target.value;
    dispatch({ type: 'SET_FIELD', field: fieldName, value: fieldValue });

    if (fieldName in validators) {
      const errorMessage = validators[fieldName](fieldValue);

      dispatch({
        type: 'SET_ERROR',
        field: fieldName,
        value: errorMessage,
      });
    }
  };

  const isFormValid: boolean =
    Object.values(errors).every((error) => !error) &&
    Object.values(formData).every((value) => value.length > 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('送信！');
    console.log('formData', formData);
  };

  return (
    <div className="form-container">
      <h1>Form with useReducer</h1>
      <form onSubmit={handleSubmit}>
        <div className="name-container">
          <div>
            <label htmlFor="last-name">姓</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor="first-name">名</label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
        </div>
        <div className="name-container">
          <div>
            <label htmlFor="last-name-kana">姓（カナ）</label>
            <input
              type="text"
              id="last-name-kana"
              name="lastNameKana"
              value={state.lastNameKana}
              onChange={handleChange}
            />
            {errors.lastNameKana && <p>{errors.lastNameKana}</p>}
          </div>
          <div>
            <label htmlFor="first-name-kana">名（カナ）</label>
            <input
              type="text"
              id="first-name-kana"
              name="firstNameKana"
              value={state.firstNameKana}
              onChange={handleChange}
            />
            {errors.firstNameKana && <p>{errors.firstNameKana}</p>}
          </div>
        </div>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
        <label htmlFor="phone">電話番号</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={state.phone}
          onChange={handleChange}
        />
        {errors.phone && <p>{errors.phone}</p>}
        <label htmlFor="age">年齢</label>
        <input
          type="number"
          id="age"
          name="age"
          value={state.age}
          onChange={handleChange}
        />
        {errors.age && <p>{errors.age}</p>}
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
        <button
          type="submit"
          disabled={!isFormValid}
        >
          送信
        </button>
      </form>
    </div>
  );
}

export default FormWithUseReducer;
