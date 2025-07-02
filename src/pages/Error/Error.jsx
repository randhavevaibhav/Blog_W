import { ErrorText } from "@/components/common/ErrorText/ErrorText";

import { MainLayout } from "@/components/common/MainLayout/MainLayout";
const Error = ({ children = "Unkown error ocuured !!" }) => {
  return (
    <MainLayout className={`max-w-[1024px] mb-0 p-10`}>
      <ErrorText>{children}</ErrorText>
    </MainLayout>
  );
};

export default Error;
