import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalsState {
  isModalOpen: boolean;
  prevModalShown: boolean;
  isPreved: boolean;
  birthdayModalShown: boolean;
  noteModalShown: boolean;
}

const initialState: ModalsState = {
  isModalOpen: false,
  prevModalShown: false,
  isPreved: false,
  birthdayModalShown: false,
  noteModalShown: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setPrevModalShown(state, action: PayloadAction<boolean>) {
      state.prevModalShown = action.payload;
    },
    setIsPreved(state, action: PayloadAction<boolean>) {
      state.isPreved = action.payload;
    },
    setBirthdayModalShown(state, action: PayloadAction<boolean>) {
      state.birthdayModalShown = action.payload;
    },
    setNoteModalShown(state, action: PayloadAction<boolean>) {
      state.birthdayModalShown = action.payload;
    }
  }
});

export const { setPrevModalShown, setIsPreved, setBirthdayModalShown, setNoteModalShown, setIsModalOpen } = modalSlice.actions;
