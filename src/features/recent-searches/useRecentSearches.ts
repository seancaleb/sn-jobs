import { RecentSearchesActions, selectRecentSearches } from "./recentSearchesSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const useRecentSearches = () => {
  const dispatch = useAppDispatch();

  const recentSearches = useAppSelector(selectRecentSearches);

  const addSearchKeywordEntry = (keyword: string) => {
    dispatch(RecentSearchesActions.addSearchKeywordEntry(keyword));
  };

  const deleteSearchKeyword = (index: number) => {
    dispatch(RecentSearchesActions.deleteSearchKeyword(index));
  };

  const resetRecentSearches = () => {
    dispatch(RecentSearchesActions.resetRecentSearches());
  };

  return {
    recentSearches,
    addSearchKeywordEntry,
    deleteSearchKeyword,
    resetRecentSearches,
  };
};

export default useRecentSearches;
