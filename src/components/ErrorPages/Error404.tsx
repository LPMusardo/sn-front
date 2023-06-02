import { Heading } from "@chakra-ui/react";
import React from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";

const Error404 = () => {
  return (
    <>
      <NavBar />

      <div>
        <h1>404 Error: Page Not Found</h1>
        <p>Oops! Looks like you've stumbled upon a page that doesn't exist.</p>
        <img src="https://http.cat/404" alt="404 Cat" />
      </div>
      <Footer />
    </>
  );
};

export default Error404;
