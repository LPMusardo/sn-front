import {
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useToast,
} from "@chakra-ui/react";
import AccordionEventItem from "./AccordionEventItem";
import { useContext, useState, useEffect } from "react";
import { useMyEvents } from "../../MyEventsContextProvider";



const PanelEvents = () => {
  
  const [events, isLoading, error] = useMyEvents()


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
      <Accordion defaultIndex={[0]} allowMultiple>
        {events.map((event) => (
          <AccordionEventItem key={event.id} event={event}/>
        ))}
      </Accordion>
    </>
  );
};

export default PanelEvents;
