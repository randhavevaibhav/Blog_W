import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LuSearchX } from "react-icons/lu";
const PageNotFound = ({ children = "Page not found" }) => {
  return (
    <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
      <div className="max-w-[50rem] mx-auto md:px-0 px-2">
        <Card className="mt-[10rem]">
          <CardHeader className="font-extrabold text-[50px] text-center">
            404
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center font-semibold text-fs_xl tracking-wide">
            <LuSearchX size={"50px"} className="animate-bounce" />

            {children}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PageNotFound;
