import { v4 as uuidv4 } from "uuid";
import TerminateSession from "@/pages/TerminateSession/TerminateSession";
import SignUp from "@/pages/SignUp/SignUp";
import SignIn from "@/pages/SignIn/SignIn";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";


export const unAuthRoutesList = [
  {
    id: uuidv4(),
    path: "/signup",
    element: <SignUp />,
  },
  {
    id: uuidv4(),
    path: "/signin",
    element: <SignIn />,
  },
  {
    id: uuidv4(),
    path: "/terminate",
    element: <TerminateSession />,
  },
  {
    id: uuidv4(),
    path: "*",
    element: <PageNotFound />,
  },
];
