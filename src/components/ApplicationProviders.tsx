import { ReactNode } from "react";

// Redux
import { Provider as ReduxProvider } from "react-redux";
import store from "@/app/store";

// React Query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Text Wrap Balancer
import { Provider as WrapBalancerProvider } from "react-wrap-balancer";

// Redux Persist
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();
const persistor = persistStore(store);

const ApplicationProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WrapBalancerProvider>{children}</WrapBalancerProvider>
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default ApplicationProviders;
