import {
  HStack,
  Text,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  ButtonGroup,
  CardFooter,
  Divider,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";
import Rating from "../shared/Rating";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsCalendarEvent, BsClock } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { RiGroupLine } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { AiFillCheckCircle, AiFillEdit } from "react-icons/ai";

interface IEventDetailsProps {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  participants_number: string;
  date: string;
  street: string;
  city: string;
  country: string;
  zip: string;
  MainCategoryName: string;
  MainCategoryId: string;
  organizerId: string;
  organizerUsername: string;
  score_avg: string;
  nb_places_taken: string;
  relationShip: string;
  setRelationShip: React.Dispatch<React.SetStateAction<string | undefined>>;
}

import axios from "axios";

async function cancelParticipation(
  id: string,
  setRelationShip: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<void> {
  try {
    await axios
      .request({
        method: "POST",
        url: "/events/" + id + "/unparticipate",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setRelationShip("not related");
      });
  } catch (error) {
    console.log(error);
  }
}

async function cancelApplication(
  id: string,
  setRelationShip: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<void> {
  try {
    await axios
      .request({
        method: "POST",
        url: "/events/" + id + "/unapply",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setRelationShip("not related");
      });
  } catch (error) {
    console.log(error);
  }
}

async function apply(
  id: string,
  setRelationShip: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<void> {
  try {
    await axios
      .request({
        method: "POST",
        url: "/events/" + id + "/apply",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setRelationShip("candidate");
      });
  } catch (error) {
    console.log(error);
  }
}

const EventDetailsPanel = ({
  id,
  name,
  category,
  description,
  // image_url,
  participants_number,
  date,
  street,
  city,
  country,
  zip,
  MainCategoryName,
  MainCategoryId,
  organizerId,
  organizerUsername,
  score_avg,
  nb_places_taken,
  relationShip,
  setRelationShip,
}: IEventDetailsProps) => {
  console.log("score_avg", typeof score_avg);

  return (
    <>
      <Card variant="outline" height={"full"}>
        <CardHeader>
          <Heading size="lg">{name}</Heading>
          <HStack align={"self-end"}>
            <Heading as="h2" size="xs" textTransform="uppercase" paddingTop={3}>
              <Link to={`/users/${organizerId}`}>{organizerUsername} </Link>
            </Heading>
            <HStack spacing={2}>
              <Badge colorScheme="purple">
                {" "}
                {score_avg !== "" ? (
                  <Rating
                    score={parseInt(score_avg, 10)}
                    total={5}
                    size={17}
                    spacing={0.2}
                  />
                ) : (
                  <p>no notes yet!</p>
                )}
              </Badge>
            </HStack>
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

                <HStack>
                  <RiGroupLine />
                  <Text as="b" pt="2" fontSize="sm">
                    {/* if nb_places_taken undefined set it to 0 */}
                    {nb_places_taken == "" ? 0 : nb_places_taken} /{" "}
                    {participants_number}
                  </Text>
                </HStack>
                <HStack>
                  <BiCategoryAlt />
                  <Text>
                    {" "}
                    <Link to={`/search/?MainCategoryId=${MainCategoryId}`}>
                      <Text as="b" pt="2" fontSize="sm">
                        {MainCategoryName}
                      </Text>
                    </Link>{" "}
                    -{" "}
                    <Text as="b" pt="2" fontSize="sm">
                      {category}
                    </Text>
                  </Text>
                </HStack>
                <HStack>
                  <BsCalendarEvent />
                  <Text as="b" pt="2" fontSize="sm">
                    {new Date(date).toLocaleDateString()}
                  </Text>
                  <BsClock />
                  <Text as="b" pt="2" fontSize="sm">
                    {new Date(date).toLocaleTimeString()}
                  </Text>
                </HStack>
              </Flex>
              <HStack spacing={1} align={"center"}>
                <Box paddingTop={1}>
                  <FaMapMarkerAlt />
                </Box>
                <Text
                  width={"100%"}
                  maxWidth={"lg"}
                  as="b"
                  pt="2"
                  fontSize="sm"
                >
                  {street}, {city}, {country}, {zip}
                </Text>
              </HStack>
            </Box>
            <Divider />
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Description
              </Heading>
              <Text pt="2" fontSize="sm">
                {description}
              </Text>
            </Box>
          </Stack>
        </CardBody>

        <CardFooter>
          <ButtonGroup spacing="2">
            {relationShip === "event owner" ? (
              <Link to={`/profile/2`}>
                <Button
                  colorScheme="yellow"
                  variant="outline"
                  leftIcon={<AiFillEdit />}
                >
                  edit
                </Button>
              </Link>
            ) : relationShip === "participant" ? (
              <Button
                //isLoading={isLoading}
                colorScheme="red"
                variant="outline"
                leftIcon={<GiCancel />}
                onClick={() => cancelParticipation(id, setRelationShip)}
              >
                unparticipate
              </Button>
            ) : relationShip === "candidate" ? (
              <Button
                //isLoading={isLoading}
                colorScheme="red"
                variant="outline"
                leftIcon={<GiCancel />}
                onClick={() => cancelApplication(id, setRelationShip)}
              >
                unapply
              </Button>
            ) : relationShip === "not related" ? (
              <Button
                //isLoading={isLoading}
                colorScheme="green"
                variant="outline"
                leftIcon={<AiFillCheckCircle />}
                onClick={() => apply(id, setRelationShip)}
              >
                apply
              </Button>
            ) : null}
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
