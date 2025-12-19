import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { LuSearchX } from "react-icons/lu";

export const NotFound = ({
  children = "Not found !!",
  dataTestId = "not-found",
}) => {
  return (
    <div
      className="md:mx-auto md:px-0 px-2 md:max-w-[40rem] w-full"
      data-test={dataTestId}
    >
      <Card className="">
        <CardHeader className="font-extrabold text-[50px] text-center">
          404
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center font-semibold text-fs_xl tracking-wide">
          <LuSearchX size={"50px"} className="animate-bounce" />

          {children}
        </CardContent>
      </Card>
    </div>
  );
};
