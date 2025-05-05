import React from "react";
import NodeForm from "../components/NodeForm";

export const RegisterPage = () => {
const fields = ["nombre", "ip", "token", "calle", "codpostal", "provincia", "localidad"];
  return (
    <>
      <NodeForm fields={fields}/>
    </>
  );
};
