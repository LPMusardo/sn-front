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
import IEvent from "./IEvent";
import { useContext, useState } from "react";
import { MyEventsContext } from "../../MyEventsContextProvider";

interface Props {
  prop: string;
}

const PanelEvents = ({ prop }: Props) => {
  
  const [events, reloadEvents, isLoading] = useContext(MyEventsContext)

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
