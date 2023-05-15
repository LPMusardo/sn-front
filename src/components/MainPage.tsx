import { Grid, GridItem, Box, Heading } from "@chakra-ui/react";
import CategoriesGrid from "../CategoriesGrid";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { SoonGrid } from "./SoonGrid";

const MainPage = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav" "main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar onSearch={() => {}} />
        </GridItem>
        <GridItem area="main">
          <Box paddingX={50}>
            <Box marginBottom={100}>
              <Heading padding="4">Event Coming soon</Heading>
              <SoonGrid />
            </Box>
            <Box>
              <Heading padding="4">Choose your Category</Heading>
              <CategoriesGrid />
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Box marginTop={100}>
        <Footer />
      </Box>
    </>
  );
};

export default MainPage;
