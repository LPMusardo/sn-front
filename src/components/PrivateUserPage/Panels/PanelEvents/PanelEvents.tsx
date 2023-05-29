import {
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import AccordionEventItem from "./AccordionEventItem";
import { useContext, useState } from "react";
import { useMyEvents } from "../../MyEventsContextProvider";



const PanelEvents = () => {
  
  const [events, isLoading, error] = useMyEvents()

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        {events.map((event) => (
          <AccordionEventItem key={event.id} event={event}/>
        ))}
      </Accordion>
    </>
  );
};

export default PanelEvents;
