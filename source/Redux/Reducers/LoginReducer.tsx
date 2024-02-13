import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ILoginData {
  token: string | null;
}

// Reducer identity & initial state
const login = 'LoginReducer';
const initialState: ILoginData = {
  token: '',
};

const LoginSlice = createSlice({
  name: login,
  initialState: initialState,
  reducers: {
    saveTokenAction: (state: ILoginData, action: PayloadAction<ILoginData>) => {
      state.token = action.payload.token;
    },
  },
});

export const {saveTokenAction} = LoginSlice.actions;
export default LoginSlice.reducer;
