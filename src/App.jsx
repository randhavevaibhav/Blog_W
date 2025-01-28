//React imports
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
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

//Page imports

export const GlobalContext = createContext();

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
      <Router>
        <ErrorBoundary FallbackComponent={Fallback}>
          <GlobalContext.Provider
            value={{
              SidebarContext: { isSidebarOpen, setIsSidebarOpen },

              UserAuthContext: { isAuth, setIsAuth },
            }}
          >
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </GlobalContext.Provider>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
