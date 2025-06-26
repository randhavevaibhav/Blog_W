//React imports
import { Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
//React imports

// components import

// components import
import { ErrorBoundary } from "react-error-boundary";
//Page imports

import { Navbar } from "./components/Navbar/Navbar";

import { Fallback } from "./pages/Fallback/Fallback";

import { AuthProvider } from "./contexts/Auth/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setTheme } from "./utils/utils";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthRoutes } from "./Routes/AuthRoutes/AuthRoutes";
import { UnAuthRoutes } from "./Routes/UnAuthRoutes/UnAuthRoutes";
import { ThemeContextProvider } from "./contexts/Theme/ThemeContextProvider";
import { HelmetProvider } from "react-helmet-async";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 25 * 60 * 1000, //25 min
    },
  },
});

//set theme
setTheme();

function App() {
  // console.log("AuthRoutes ===> ",...AuthRoutes())
  return (
    <>
      <Router>
        <ErrorBoundary FallbackComponent={Fallback}>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <AuthProvider>
                <ThemeContextProvider>
                  <Navbar />
                </ThemeContextProvider>

                <Routes>
                  {/* Protected routes */}
                  {AuthRoutes()}
                  {/* Public routes */}
                  {UnAuthRoutes()}
                </Routes>
              </AuthProvider>
            </HelmetProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
