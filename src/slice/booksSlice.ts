import { BooksBase } from "@/interfaces/booksBase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface BooksState {
    favBooks: BooksBase[];
    newFavNotifications: number;
}

// Define the initial state using that type
const initialState: BooksState = {
    favBooks: [],
    newFavNotifications: 0,
};

export const booksSlice = createSlice({
    name: "Books",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addFavBook: (state, action: PayloadAction<BooksBase>) => {
            state.favBooks = [action.payload, ...state.favBooks];
        },
        addNewFavNotification: (state, action: PayloadAction<number>) => {
            state.newFavNotifications += action.payload;
        },
        resetFavNotifications: (state, action: PayloadAction<number>) => {
            state.newFavNotifications = action.payload;
        },
    },
});

export const { addFavBook, addNewFavNotification, resetFavNotifications } =
    booksSlice.actions;

export default booksSlice.reducer;
