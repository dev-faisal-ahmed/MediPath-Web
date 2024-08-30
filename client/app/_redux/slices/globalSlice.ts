import { TOverViewType } from '@/app/_utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TSearchSlice = {
  billId: string;
  type: TOverViewType;
};

const initialState: TSearchSlice = {
  billId: '',
  type: 'DAILY',
};

export const globalSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateBillId: (state, action: PayloadAction<string>) => {
      state.billId = action.payload;
      return state;
    },

    updateType: (state, action: PayloadAction<TOverViewType>) => {
      state.type = action.payload;
    },
  },
});

export const { updateBillId, updateType } = globalSlice.actions;
