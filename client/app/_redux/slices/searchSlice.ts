import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TSearchSlice = {
  billId: string;
};

const initialState: TSearchSlice = {
  billId: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateBillId: (state, action: PayloadAction<string>) => {
      state.billId = action.payload;
      return state;
    },
  },
});

export const { updateBillId } = searchSlice.actions;
