import { ReactNode } from "react";

// Redux
import { Provider as ReduxProvider } from "react-redux";
import store from "@/app/store";

// React Query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Text Wrap Balancer
import { Provider as WrapBalancerProvider } from "react-wrap-balancer";

const queryClient = new QueryClient();

const ApplicationProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <WrapBalancerProvider>{children}</WrapBalancerProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default ApplicationProviders;
