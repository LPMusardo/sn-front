import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import LoginContextProvider from "./components/LoginContextProvider.tsx";
import SearchContextProvider from "./components/EventListPage/SearchContextProvider.tsx";
import FetchSearchContextProvider from "./components/EventListPage/FetchSearchContextProvider.tsx";
import CategoriesContextProvider from "./components/CategoriesContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <LoginContextProvider>
          <SearchContextProvider>
            <FetchSearchContextProvider>
              <CategoriesContextProvider>
                <App />
              </CategoriesContextProvider>
            </FetchSearchContextProvider>
          </SearchContextProvider>
        </LoginContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
