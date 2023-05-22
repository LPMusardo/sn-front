import {
  useDisclosure,
  Button,
  Collapse,
  Box,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import FiltersPanel from "./FiltersPanel";
import { BsSliders } from "react-icons/bs";

const FiltersToggle = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <VStack>
        <HStack w="100%">
          <Button
            onClick={onToggle}
            rightIcon={<BsSliders />}
            colorScheme="purple"
          >
            Filters
          </Button>
        </HStack>
        <Collapse in={isOpen} animateOpacity>
          <FiltersPanel close={() => onToggle()} />
        </Collapse>
      </VStack>
    </>
  );
};
export default FiltersToggle;
