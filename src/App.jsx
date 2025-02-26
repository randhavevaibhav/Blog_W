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
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { RequireAuth } from "./pages/RequireAuth/RequireAuth";
import {PersistLogin} from "./pages/PersistLogin/PersistLogin";
import { Fallback } from "./pages/Fallback/Fallback";

import { AuthProvider } from "./contexts/Auth/AuthProvider";




import { QueryClient, QueryClientProvider } from "@tanstack/react-query";




export const queryClient = new QueryClient();



function App() {
  return (
    <>
      <Router>
        <ErrorBoundary FallbackComponent={Fallback}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                {/* Protected routes */}
                <Route element={<PersistLogin />}>
                  <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<CreatePost />} />
                    <Route path="/dashboard" element={<Dashboard />} />
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
