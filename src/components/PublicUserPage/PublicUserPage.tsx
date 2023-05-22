import { Box, Grid, GridItem } from "@chakra-ui/react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

const PublicUserPage = () => {
  return (
    <>
      <NavBar onSearch={() => {}} />
      <Box margin={5} minH="60vh">
        <Grid templateColumns={{ sm: "1fr", md: "1fr 2fr" }} gap={10}>
          <GridItem overflow={"clip"}>
            <LeftPanel />
          </GridItem>
          <GridItem overflow={"clip"}>
            <RightPanel />
          </GridItem>
        </Grid>
      </Box>
      <Box marginTop={100}>
        <Footer />
      </Box>
    </>
  );
};

export default PublicUserPage;
