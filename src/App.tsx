import { useState } from "react";
import { Button } from "@/components/ui/button";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <section className="py-32">
      <div className="max-w-xs w-full mx-auto border border-slate-200 p-8 rounded-sm">
        <div className="grid gap-y-2">
          <h1 className="text-3xl font-bold">Hello World</h1>
          <h2 className="text-xl">{count}</h2>
          <div>
            <Button onClick={() => setCount((prev) => prev + 1)}>Increment</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
