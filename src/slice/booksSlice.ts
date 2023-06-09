import { BooksBase } from "@/interfaces/booksBase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface BooksState {
    favBooks: BooksBase[];
}

// Define the initial state using that type
const initialState: BooksState = {
    favBooks: [],
};

export const booksSlice = createSlice({
    name: "Books",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addFavBook: (state, action: PayloadAction<BooksBase>) => {
            state.favBooks = [action.payload, ...state.favBooks];
        },
    },
});

export const { addFavBook } = booksSlice.actions;

export default booksSlice.reducer;
