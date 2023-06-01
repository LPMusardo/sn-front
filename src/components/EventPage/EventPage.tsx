import { Box, GridItem, SimpleGrid, useToast } from "@chakra-ui/react";
import EventDetailsPanel from "./EventDetailsPanel";
import EventImagePanel from "./EventImagePanel";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IEventData } from "../../models/IEventData";
import { useAxiosFetch } from "../../services/useAxiosFetch";
import { useLogin } from "../LoginContextProvider";

const EventPage = () => {
  const { id } = useParams();

  const [events, setEvents] = useState<IEventData>();

  const [relationShip, setRelationShip] = useState<string>();

  const table = useLogin();
  const userData = table[5]();


  const [data, error, loading] = useAxiosFetch({
    method: "GET",
    url: "/events?eventId=" + id + "&include_notes=true&include_organizer=true",
  });

  const [dataRelationShip] = useAxiosFetch({
    method: "GET",
    url:
      "/events/event_relationship?eventId=" +
      id + "&userId=" + userData?.id,
  });

  useEffect(() => {
    console.log("retrieving relationship...");

    if (dataRelationShip) {
      console.log("retrieving relationship...");
      setRelationShip(dataRelationShip.events.value);
      console.log(dataRelationShip.events.value);
    } else {
      setRelationShip("");
    }
  }, [dataRelationShip]);

  useEffect(() => {
    if (data) {
      console.log("retrieving events...");
      setEvents(data.events);
      console.log(data.events);
    } else {
      setEvents("{}" as any as IEventData);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);


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

  useEffect(() => {
    if (loading) {
      console.log("retrieving events...");
    }
  }, [loading]);

  return (
    <>
      <NavBar />
      <Box minH="70vh">
        <SimpleGrid
          gridAutoRows="1fr"
          minChildWidth="md"
          spacing="10"
          padding="10"
          templateColumns={{
            lg: "2fr 1fr",
          }}
        >
          <GridItem>
            <EventDetailsPanel
              key={id}
              id={id ?? ""}
              name={events?.name ?? ""}
              category={events?.category ?? ""}
              description={events?.description ?? ""}
              image_url={events?.image_url ?? ""}
              participants_number={events?.participants_number ?? ""}
              date={events?.date ?? ""}
              street={events?.Address?.street ?? ""}
              city={events?.Address?.city ?? ""}
              country={events?.Address?.country ?? ""}
              zip={events?.Address?.zip ?? ""}
              MainCategoryName={events?.MainCategory?.name ?? ""}
              MainCategoryId={events?.MainCategory?.id ?? ""}
              organizerId={events?.organizer?.id ?? ""}
              organizerUsername={events?.organizer?.username ?? ""}
              score_avg={events?.score_avg?.score_avg ?? ""}
              nb_places_taken={events?.participants?.[0]?.nb_places_taken ?? ""}
              relationShip={relationShip ?? ""}
              setRelationShip={setRelationShip}
            />
          </GridItem>
          <GridItem>
            <EventImagePanel key={id} image_url={events?.image_url ?? ""} />
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box marginTop={100}>
        <Footer />
      </Box>
    </>
  );
};

export default EventPage;
