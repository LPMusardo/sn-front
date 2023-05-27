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
} from "@chakra-ui/react";
import Rating from "../shared/Rating";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import ValidationBtn from "../shared/ValidationBtn";
import { Link } from "react-router-dom";
import { BsCalendarEvent, BsClock, BsSearch } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { RiGroupLine } from "react-icons/ri";

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
}

const EventDetailsPanel = ({
  //id,
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
}: IEventDetailsProps) => {
  return (
    <>
      <Card variant="outline" height={"full"}>
        <CardHeader>
          <Heading size="lg">{name}</Heading>
          <HStack align={"self-end"}>
            <Heading as="h2" size="xs" textTransform="uppercase" paddingTop={3}>
              <Link to={`/users/${organizerId}`}>{organizerUsername} </Link>
            </Heading>
            <Rating
              score={parseInt(score_avg, 10)}
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

                <HStack>
                  <RiGroupLine />
                  <Text as="b" pt="2" fontSize="sm">
                    {nb_places_taken} / {participants_number}
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
            
            <ValidationBtn
            children={<BsSearch />}
            colorScheme="green"
            modalBtnValidateTxt="Accept"
            modalBtnCancelTxt={"Cancel"}
            modalHeader={"Accept the candidate " + " ?"}
            modalTxt="This action is irreversible"
            onValidate={async function () {
            } }
            successToast={{
              title: " accepted",
              description: "bli bla blu",
              status: "success",
              duration: 3000,
              isClosable: true,
            }}
            failToast={{
              title: "Error encountered",
              description: "The applying did not worked",
              status: "error",
              duration: 3000,
              isClosable: true,
            }}
            onFinal={async function () {


            } } />
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
