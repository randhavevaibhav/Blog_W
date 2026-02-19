//CTA only visible for un-auth users

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/useAuth";
import { getSignupPageLink } from "@/utils/getLinks";
import React from "react";

import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const { auth } = useAuth();
  const { accessToken } = auth;
  const navigate = useNavigate();
  if (accessToken) {
    return null;
  }
  return (
    <Card className="bg-card-bg order-1 rounded-md">
      <CardHeader className="font-semibold text-xl py-3">
        Join 5K+ Creators Worldwide!
      </CardHeader>
      <CardContent className={"p-4"}>
        Whether you’re here to read, write, or just explore, you’re in good
        company. Join our growing community of 5K+ members and start sharing
        your voice on a platform built for everyone.
      </CardContent>
      <CardFooter className={"pt-0 lg:p-5 p-4"}>
        <Button
          variant="action"
          onClick={() => navigate(getSignupPageLink())}
          className=" mr-5 h-9 md:h-10"
          data-test={`create_account`}
        >
          <span className="text-fs_base font-semibold">Get Started</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
