import { Spinner } from "../Spinner/Spinner";

export const LoadingWithText = ({children}) => {
  return (
    <div className="flex items-center gap-4">
      <p>{children}</p> <Spinner />
    </div>
  );
};
