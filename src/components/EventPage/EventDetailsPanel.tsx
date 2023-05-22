import {
  HStack,
  Text,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Button,
  ButtonGroup,
  CardFooter,
  Divider,
  Flex,
  VStack,
  Center,
} from "@chakra-ui/react";
import Rating from "../shared/Rating";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import ValidationBtn from "../shared/ValidationBtn";

const EventDetailsPanel = () => {
  return (
    <>
      <Card variant="outline" height={"full"}>
        <CardHeader>
          <Heading size="lg">GP de karting au Castellet</Heading>
          <HStack align={"self-end"}>
            <Heading as="h2" size="xs" textTransform="uppercase" paddingTop={3}>
              Charles Darbesson
            </Heading>
            <Rating
              score={4}
              total={5}
              color="#FF6A00"
              size={17}
              spacing={0.2}
            />
          </HStack>
        </CardHeader>

        <CardBody>
          <Stack spacing="10">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Detail
              </Heading>
              <Flex justifyContent={"space-between"} maxWidth={"lg"}>
                <Box paddingTop={2}>
                  <IoInformationCircleSharp />
                </Box>
                <Text as="b" pt="2" fontSize="sm">
                  8/15
                </Text>
                <Text as="b" pt="2" fontSize="sm">
                  Sport
                </Text>
                <Text as="b" pt="2" fontSize="sm">
                  Karting
                </Text>
                <Text as="b" pt="2" fontSize="sm">
                  04/07/23
                </Text>
              </Flex>
              <HStack spacing={1} align={"center"}>
                <Box paddingTop={1}>
                  <FaMapMarkerAlt />
                </Box>
                <Center width={"100%"} maxWidth={"lg"}>
                  <Text as="b" pt="2" fontSize="sm">
                    2760 Rte des Hauts du Camp, 83330 Le Castellet
                  </Text>
                </Center>
              </HStack>
            </Box>
            <Divider />
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Description
              </Heading>
              <Text pt="2" fontSize="sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                labore saepe, recusandae, fugit quam repudiandae delectus ad
                tempore sit fugiat vero. Aliquam pariatur consectetur velit.
                Sint numquam doloremque vero possimus. Corporis iste, quod nobis
                facere libero exercitationem nisi modi inventore explicabo alias
                autem, commodi laborum at soluta quo voluptatem quas natus! Sit
                sequi quis dolorem tempora molestias aliquid rem omnis.
              </Text>
            </Box>
          </Stack>
        </CardBody>

        <CardFooter>
          <ButtonGroup spacing="2">
            <ValidationBtn disabled={false} />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default EventDetailsPanel;

/* <div>Remplissage [participant/maximum]</div>
      <div>Main Category : </div>
      <div>Category : </div>
      <div>[date]</div>
      <div>[adresse]</div>
      <div>description</div>
      <div>[prénom et nom orgnaidateur]</div>
      <div>[score organisateur]</div>
      <div>[added date]</div>
      <br />
      <div>
        btn partager le lien de l'event,copie dans le clipboard et affiche le
        lien
      </div>
      <br />
      <div>Messages du chat, si connecté et participant</div>
      <div>SINON</div>
      <div>
        bouton pour participer --x modal de validation --x toast result{" "}
      </div> */
