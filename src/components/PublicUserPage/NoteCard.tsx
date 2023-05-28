import {
  Card,
  Stack,
  CardBody,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";


interface Props {
  username: string;
  pictureUrl:string;
  id: string;
}

const NoteCard = ({ username, pictureUrl,id}: Props) => {
  return (
    <Card direction="row" overflow="hidden" variant="unstyled">
      <Image
        objectFit="contain"
        height="10"
        src={pictureUrl}
      />

      <Stack width="100%">
        <CardBody>
          <Flex height="100%" justifyContent="left" alignItems="center">
          <Link  style={{ color: "#B195EE" }} to={`/users/${id}`}>
            <Text px="4" size="20xs">
              {username}
            </Text>
          </Link>
          </Flex>

          {/* <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text> */}
        </CardBody>

        {/* <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Buy Latte
          </Button>
        </CardFooter> */}
      </Stack>
    </Card>
  );
};

export default NoteCard;
