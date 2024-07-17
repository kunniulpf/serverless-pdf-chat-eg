import React from "react";
import DocumentUploader from "../components/DocumentUploader";
import DocumentList from "../components/DocumentList";
import { withAuthenticator } from "@aws-amplify/ui-react";

const Documents: React.FC = () => {
  return (
    <>
      <DocumentUploader />
      <DocumentList />
    </>
  );
};

export default withAuthenticator(Documents);
