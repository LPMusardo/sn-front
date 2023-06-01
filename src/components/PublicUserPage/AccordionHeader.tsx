import { Badge, Flex, HStack, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

interface Props {
  text: string;
  badgeContent: ReactElement;
}

const AccordionHeader = ({ text, badgeContent }: Props) => {
  return (
    <Flex justifyContent="space-between" textAlign="left" width="100%">
      <HStack spacing={2}>
        <Text>{text}</Text>
        <Badge colorScheme="purple">{badgeContent}</Badge>
      </HStack>
    </Flex>
  );
};

export default AccordionHeader;
