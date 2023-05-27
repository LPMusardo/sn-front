import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  ButtonGroup,
  Button,
  Link,
  HStack,
} from "@chakra-ui/react";
import { BsCalendarEvent, BsChatSquareText } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { Link as ReachLink } from "react-router-dom";

interface SoonEventCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  participants_number: string;
  date: string;
}

const SoonEventCard = ({
  id,
  name,
  category,
  description,
  image_url,
  participants_number,
  date,
}: SoonEventCardProps) => {
  return (
    <Card size={"md"}>
      <CardBody>
        <Link as={ReachLink} to={`/events/${id}`}>
          <Image
            src={image_url}
            alt="Green double couch with wooden legs"
            fallbackSrc="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
            borderRadius="lg"
          />
        </Link>
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>

          <HStack mt="4" alignItems="center">
            <BsChatSquareText />
            <Text>{description.substring(0, 35) + " ..."}</Text>
          </HStack>
          <HStack>
            <RiGroupLine />
            <Text color="purple.100" fontSize="m">
              {participants_number} participants
            </Text>
          </HStack>

          <HStack>
            <BsCalendarEvent />
            <Text color="purple.300" fontSize="s">
              {new Date(date).toDateString()}
            </Text>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          
          <Button variant="solid" colorScheme="purple">
            Apply
          </Button>
          <Link as={ReachLink} to={`/events/${id}`}>
            <Button variant="ghost" colorScheme="purple">
              More details
            </Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default SoonEventCard;
