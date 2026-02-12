import React, { memo } from "react";
import { Card, CardContent, CardHeader } from "../../../ui/card";

export const Skills = memo(({ skills }) => {

  return (
    <Card className="bg-card-bg">
      <CardHeader>
        <h3 className="capitalize font-medium text-fs_2xl tracking-wide">
          Skills
        </h3>
        <hr />
      </CardHeader>
      <CardContent className="skills  rounded-md">
        <p className="">{skills}</p>
      </CardContent>
    </Card>
  );
});
