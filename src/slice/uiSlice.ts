import { Genre } from "@/interfaces/booksBase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UIState {
    showFilters: boolean;
    bookmarksSelectedFilters: Genre[];
    homeSelectedFilters: Genre[];
}

// Define the initial state using that type
const initialState: UIState = {
    showFilters: false,
    bookmarksSelectedFilters: [],
    homeSelectedFilters: [],
};

export const uiSlice = createSlice({
    name: "Ui",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        toggleShowFilters: (state, action: PayloadAction<boolean>) => {
            state.showFilters = action.payload;
        },
        setBookmarksSelectedFilters: (
            state,
            action: PayloadAction<Genre[]>
        ) => {
            state.bookmarksSelectedFilters = [...action.payload];
        },
        setHomeSelectedFilters: (state, action: PayloadAction<Genre[]>) => {
            state.homeSelectedFilters = [...action.payload];
        },
    },
});

export const {
    toggleShowFilters,
    setBookmarksSelectedFilters,
    setHomeSelectedFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
