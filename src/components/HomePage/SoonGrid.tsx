import { SimpleGrid, useToast } from "@chakra-ui/react";
import SoonEventCard from "./SoonEventCard";

import React, { useState, useEffect } from "react";
import { useAxiosFetch } from "../../services/useAxiosFetch";
import { ISoonEventData } from "../../models/ISoonEventData.tsx";
import ParticipantNotesTable from "../PublicUserPage/ParticipantNotesTable.tsx";

export const SoonGrid = () => {
  const [soonEvents, setSoonEvents] = useState<ISoonEventData[]>([]);

  const [data, error, loading] = useAxiosFetch({
    method: "GET",
    url: "/xxevents/upcoming",
  });

  useEffect(() => {
    if (data) {
      console.log("retrieving events...");
      setSoonEvents(data.events);
      console.log(data.events);
    } else {
      setSoonEvents([]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("retrieving categories...");
    }
  }, [loading]);

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
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} padding="10px" spacing={10}>
      {soonEvents.map((event: ISoonEventData) => (
        <SoonEventCard
          key={event.id}
          name={event.name}
          id={event.id}
          image_url={event.image_url}
          description={event.description}
          participants_number={event.participants_number}
          category={event.category}
          date={event.date}
        />
      ))}
    </SimpleGrid>
  );
};
