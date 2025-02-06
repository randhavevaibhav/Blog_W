//React imports
import { Routes, Route } from "react-router-dom";
import { createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
//React imports

// components import

// components import
import { ErrorBoundary } from "react-error-boundary";
//Page imports
import { Home } from "./pages/Home/Home";
import { Navbar } from "./comonents/Navbar/Navbar";
import { SignUp } from "./pages/SignUp/SignUp";
import { SignIn } from "./pages/SignIn/SignIn";
import { CreatePost } from "./pages/new/CreatePost";
import { Dashboard } from "./pages/Dashboard/Dashboard";

import {
  
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

//Page imports

export const GlobalContext = createContext();
const queryClient = new QueryClient();

const Fallback = ({ error }) => {
  console.log("fallback");
  return (
    <>
      <h3>Something went Wrong !!!</h3>
      <pre>{error.message}</pre>
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <ErrorBoundary FallbackComponent={Fallback}>
          <QueryClientProvider client={queryClient}>
            <GlobalContext.Provider value={{}}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/new" element={<CreatePost />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </GlobalContext.Provider>
          </QueryClientProvider>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
