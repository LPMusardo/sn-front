import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
  Center,
  Box,
  Flex,
} from "@chakra-ui/react";

interface Props {
  username: string;
  pictureUrl:string
}

const NoteCard = ({ username, pictureUrl}: Props) => {
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
            <Text px="4" size="20xs">
              {username}
            </Text>
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
