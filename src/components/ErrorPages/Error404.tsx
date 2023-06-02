import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

const Error404 = () => {
  return (
    <>
      <NavBar />
      <Box
        minH="70vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Box>
          <Heading fontSize="6xl" fontWeight="bold" mb={4}>
            404 Error: Page Not Found
          </Heading>
          <Text fontSize="xl">
            Ooops, looks like you are looking for a page that doesn't exist.
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Error404;
