import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const BackButton = (props={}) => {
  const {className=""} = props;
  const navigate = useNavigate();
  return (
    <Button
      variant={"ghost"}
      className={cn("my-2",className)}
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowLeft />
      Back
    </Button>
  );
};
