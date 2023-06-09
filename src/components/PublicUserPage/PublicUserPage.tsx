import { Box, Grid, GridItem, useToast } from "@chakra-ui/react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import { useAxiosFetch } from "../../services/useAxiosFetch";
import { IUserData } from "../../models/IUserData";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PublicUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUserData>({} as IUserData);
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "GET",
    url:
      "/users?id=" +
      id +
      "&include_organizedEvents=true&include_candidateEvents=true&include_participantEvents=true&include_givenNotes=true&include_receivedNotes=true",
  });

  useEffect(() => {
    if (data) {
      setUser(data.user);
    } else {
      // sent to error page
      setUser({} as IUserData);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log("Catched error : ",error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
    }
  }, [loading]);

  useEffect(() => {
    fetchData();
  }, [id]);


  //----------------------------- Error Toast -----------------------------
  const toast = useToast()
  useEffect(() => {
    if (error) {
      toast.closeAll();
      toast({
        title: 'Error Encountered',
        description: error,
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [error])

  return (
    <>
      <NavBar />
      <Box margin={5} minH="60vh">
        <Grid templateColumns={{ sm: "1fr", md: "1fr 2fr" }} gap={10}>
          <GridItem overflow={"clip"}>
            <LeftPanel key={id} user={user} />
          </GridItem>
          <GridItem overflow={"clip"}>
            <RightPanel key={id} user={user} />
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
