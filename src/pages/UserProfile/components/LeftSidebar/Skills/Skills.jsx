import React, { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaTools } from "react-icons/fa";
export const Skills = memo(({ skills }) => {

  return (
    <Card className="bg-card-bg">
      <CardHeader>
        <h3 className="capitalize font-semibold lg:text-2xl text-xl tracking-wide w-fit flex items-baseline gap-2">
          <FaTools className="flex-none"/>
          Skills
          
        </h3>
      
      </CardHeader>
      <CardContent className="skills  rounded-md">
        <p className="">{skills}</p>
      </CardContent>
    </Card>
  );
});
