import {
  Box,
  Divider,
  FormErrorMessage,
  HStack,
  Heading,
  IconButton,
  Select,
} from "@chakra-ui/react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";




const CookiesPopupBtn = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme="black" fontWeight="normal" variant="link">Cookies Policy</Button>
        </PopoverTrigger>
        <PopoverContent p={3} height="max-content" w="100%" margin="5px">
          <PopoverArrow />
          <Box className="disable">
            <iframe className="disable" src="https://giphy.com/embed/1ngQorBCDcUFy" width="480" height="269"></iframe>
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CookiesPopupBtn;
