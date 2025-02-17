//React imports
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
//React imports

// components import

// components import
import { ErrorBoundary } from "react-error-boundary";
//Page imports
import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { SignUp } from "./pages/SignUp/SignUp";
import { SignIn } from "./pages/SignIn/SignIn";
import { CreatePost } from "./pages/new/CreatePost";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Layout } from "./pages/Layout/Layout";

import { AuthProvider } from "./contexts/Auth/AuthProvider";
import { RequireAuth } from "./pages/RequireAuth/RequireAuth";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersistLogin from "./pages/PersistLogin/PersistLogin";

//Page imports

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
            <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* Public routes */}

                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  {/* Protected routes */}
                  <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                      <Route path="/home" element={<Home />} />
                      <Route path="/new" element={<CreatePost />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </AuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
