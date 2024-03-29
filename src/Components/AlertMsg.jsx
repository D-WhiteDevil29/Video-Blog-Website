import { Alert, AlertTitle } from "@chakra-ui/react";
import React from "react";

const AlertMsg = ({ status, msg, icon }) => {
  return (
    <Alert status={`${status ? status : "info"}`}>
      {icon}
      <AlertTitle ml={10}>{msg}</AlertTitle>
    </Alert>
  );
};

export default AlertMsg;