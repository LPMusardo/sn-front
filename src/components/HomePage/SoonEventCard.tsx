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
  Flex,

  useColorModeValue,
  Center,

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
    <Card size={"md"} maxWidth="sm">
      <CardBody>
        <Link as={ReachLink} to={`/events/${id}`}>
          <Center className="square">
            <Image
              className="image"
              src={image_url}
              borderRadius="lg"
              objectFit="cover"
              fallbackSrc="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
              // fallbackSrc="https://via.placeholder.com/150"
              // fallbackSrc="https://cdn.cdkeys.com/700x700/media/catalog/product/b/a/babylons-fall-pc-game-steam-cover_2_.jpg"
            />
          </Center>
        </Link>
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>

          <HStack mt="4" alignItems="center">
            <BsChatSquareText />
            <Text>{description.substring(0, 35) + " ..."}</Text>
          </HStack>
          <HStack>
            <RiGroupLine
              color={useColorModeValue("purple.700", "purple.200")}
            />
            <Text fontSize="m">{participants_number} participants</Text>
          </HStack>

          <HStack>
            <BsCalendarEvent
            />
            <Text
              color={useColorModeValue("purple.700", "purple.200")}
              fontSize="s"
            >
              {new Date(date).toDateString()}
            </Text>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex width="100%">
          <Link as={ReachLink} to={`/events/${id}`}>
            <Button variant="ghost" colorScheme="purple">
              More details
            </Button>
          </Link>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default SoonEventCard;
