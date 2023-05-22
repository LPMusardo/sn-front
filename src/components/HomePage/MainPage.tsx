import { Grid, GridItem, Box, Heading } from "@chakra-ui/react";
import CategoriesGrid from "./CategoriesGrid";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";
import { SoonGrid } from "./SoonGrid";
import { createSearchParams, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

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
          <NavBar
            onSearch={(data) =>
              navigate({
                pathname: "/search",
                search: `?${createSearchParams({ eventName: data })}`,
              })
            }
          />
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
