import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant={"ghost"}
      className={"my-2"}
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowLeft />
      Back
    </Button>
  );
};
