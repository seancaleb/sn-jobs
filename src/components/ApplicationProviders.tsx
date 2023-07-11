import { ReactNode } from "react";

// Redux
import { Provider as ReduxProvider } from "react-redux";
import store from "@/app/store";

// React Query
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const ApplicationProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </QueryClientProvider>
  );
};

export default ApplicationProviders;
