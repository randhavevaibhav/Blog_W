import { Spinner } from "../Spinner/Spinner";

export const LoadingWithText = ({ text = "" }) => {
  return (
    <div className="flex items-center gap-4">
      <p>{text}</p> <Spinner />
    </div>
  );
};
