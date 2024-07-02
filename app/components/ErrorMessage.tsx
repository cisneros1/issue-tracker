import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren, ReactNode } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  console.log("Error Message: " + children);
  if (!children) return null;

  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
