import { useAppDispatch } from "@/app/hooks";
import { CounterActions } from "./counterSlice";

const useCounter = () => {
  const dispatch = useAppDispatch();

  const increment = () => {
    dispatch(CounterActions.increment());
  };

  const decrement = () => {
    dispatch(CounterActions.decrement());
  };

  const incrementByAmount = (amount: number) => {
    dispatch(CounterActions.incrementByAmount(amount));
  };

  return {
    increment,
    decrement,
    incrementByAmount,
  };
};

export default useCounter;
