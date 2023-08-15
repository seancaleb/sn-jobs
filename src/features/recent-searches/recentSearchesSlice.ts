import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RecentSearchesState = {
  searches: string[];
};

const initialState: RecentSearchesState = {
  searches: [],
};

const recentSearchesSlice = createSlice({
  name: "recentSearches",
  initialState,
  reducers: {
    addSearchKeywordEntry: (state, action: PayloadAction<string>) => {
      const keywordFoundIndex = state.searches.indexOf(action.payload);

      if (keywordFoundIndex !== -1) {
        state.searches.splice(keywordFoundIndex, 1);
        state.searches.unshift(action.payload);
      } else state.searches.unshift(action.payload);
    },
    deleteSearchKeyword: (state, action: PayloadAction<number>) => {
      state.searches.splice(action.payload, 1);
    },
    resetRecentSearches: (state) => {
      state.searches = [];
    },
  },
});

export const selectRecentSearches = (state: RootState) => state.recentSearches.searches;

export const RecentSearchesActions = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;
