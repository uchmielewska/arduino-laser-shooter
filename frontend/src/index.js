import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./components/AppLayout";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AppLayout />
    </ChakraProvider>
  </React.StrictMode>
);
