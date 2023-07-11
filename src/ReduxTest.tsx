import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import useCounter from "@/features/counter/useCounter";
import { selectCount } from "@/features/counter/counterSlice";

const ReduxTest = () => {
  const { increment, decrement, incrementByAmount } = useCounter();
  const count = useAppSelector(selectCount);

  return (
    <section className="py-32">
      <div className="max-w-xs w-full mx-auto border border-slate-200 p-8 rounded-sm">
        <div className="grid gap-y-2">
          <h1 className="text-3xl font-bold">Redux Test</h1>
          <h2 className="text-xl">{count}</h2>
          <div className="flex flex-col space-y-2">
            <Button onClick={increment}>Increment</Button>
            <Button onClick={decrement}>Decrement</Button>
            <Button onClick={() => incrementByAmount(10)}>Increment by 10</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReduxTest;
