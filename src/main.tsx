import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import LoginContextProvider from "./components/LoginContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <LoginContextProvider>
          <App />
        </LoginContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
