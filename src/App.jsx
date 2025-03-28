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
import { PersistLogin } from "./pages/PersistLogin/PersistLogin";
import { Fallback } from "./pages/Fallback/Fallback";
import { IndiviualPost } from "./pages/IndiviualPost/IndiviualPost";

import { AuthProvider } from "./contexts/Auth/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setTheme } from "./utils/browser";
import { EditPost } from "./pages/EditPost/EditPost";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 4 * 60 * 1000,
    },
  },
});

//set theme
setTheme();
function App() {
  return (
    <>
      <Router>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Provider store={store}>
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
                      <Route
                        path="/post/:userId/:postId"
                        element={<IndiviualPost />}
                      />
                      <Route
                        path="/edit/:userId/:postId"
                        element={<EditPost />}
                      />
                      <Route path="/user/:userMail" element={<UserProfile />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </AuthProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Provider>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
