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
} from "@chakra-ui/react";
import React from "react";

const EventDetailsPanel = () => {
  return (
    <>
      <Card variant="outline">
        <CardHeader>
          <Heading size="lg">GP de karting au Castellet</Heading>
          <HStack align={"baseline"}>
            <Heading as="h2" size="xs" textTransform="uppercase" paddingTop={3}>
              Charles Darbesson
            </Heading>
            <Box>
            ✮✮✮✮✩
            </Box>
          </HStack>
        </CardHeader>

        <CardBody>
          <Stack spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Details
              </Heading>
              <HStack>
                <Text pt="2" fontSize="sm">
                  8/15
                </Text>
                <Text pt="2" fontSize="sm">
                  Sport
                </Text>
                <Text pt="2" fontSize="sm">
                  Karting
                </Text>
                <Text pt="2" fontSize="sm">
                  04/07/23
                </Text>
              </HStack>
              <Box>
                <Text pt="2" fontSize="sm">
                  2760 Rte des Hauts du Camp, 83330 Le Castellet
                </Text>
              </Box>
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
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      {/* <div>Remplissage [participant/maximum]</div>
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
      </div> */}
    </>
  );
};

export default EventDetailsPanel;
