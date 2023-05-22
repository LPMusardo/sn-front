import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import SoonEventCard from "./SoonEventCard";

export const SoonGrid = () => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} padding="10px" spacing={10}>
      <SoonEventCard />
      <SoonEventCard />
      <SoonEventCard />
      <SoonEventCard />
    </SimpleGrid>
  );
};
