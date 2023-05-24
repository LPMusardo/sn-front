import {
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useColorModeValue,
  Heading,
  HStack,
  Link,
  VStack,
  Image,
  Button,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useMyApplications } from "../../MyApplicationsContextProvider";
import { BiCategoryAlt } from "react-icons/bi";
import { BsCalendarEvent, BsChatSquareText } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import ValidationBtn from "../../../shared/ValidationBtn";
import { useLogin } from "../../../LoginContextProvider";

interface Props {
  prop: string;
}

const PanelApplications = ({ prop }: Props) => {
  const [events, isLoading, error, cancelApplication] = useMyApplications();
  const [isLogged, isl, e, login, logout, getUserData] = useLogin();
  const userData = getUserData();

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        {events.map(
          (event) => (
            <AccordionItem
              my="2"
              mx="4"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              borderWidth="1px"
            >
              <Heading size="md" color="red">
                {error}
              </Heading>
              <h2>
                <AccordionButton>
                  <Heading size="md">{event.name}</Heading>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <HStack>
                  <VStack spacing="4" mr="8">
                    <Box w="250px" h="250px">
                      <Image
                        h="100%"
                        w="100%"
                        objectFit="contain"
                        src={event.image_url}
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                    </Box>
                    <Link href="/">link/vers/page/events/{event.id}</Link>
                  </VStack>
                  <VStack spacing="3" alignItems="start">
                    <HStack>
                      <BsCalendarEvent />
                      <Text>{event.date}</Text>
                    </HStack>
                    <HStack>
                      <RiGroupLine />
                      <Text>
                        ?/{event.participants_number}
                      </Text>
                    </HStack>
                    <HStack>
                      <FiMapPin />
                      <Text>{event.Address.street}</Text>
                      <Text>{event.Address.city}</Text>
                      <Text>{event.Address.zip}</Text>
                      <Text>{event.Address.country}</Text>
                    </HStack>
                    <HStack>
                      <BiCategoryAlt />
                      <Text>{event.MainCategory.name}</Text>
                      <Text> - </Text>
                      <Text>{event.category}</Text>
                    </HStack>
                    <HStack mt="4" maxW="2xl">
                      <Box>
                        <BsChatSquareText />
                      </Box>
                      <Text>{event.description}</Text>
                    </HStack>
                    <Text>{new Date(event.creation_date).toDateString()}</Text>
                  </VStack>
                  <VStack spacing="4" mr="8">
                    <Text>{userData && userData.email}</Text>
                    <Text>{userData && userData.username}</Text>
                    <Text>{userData && userData.id}</Text>
                    <Button isLoading={isLoading} onClick={()=>cancelApplication(event.id)}>Cancel</Button>
                  </VStack>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          )
        )}
      </Accordion>
    </>
  );
};

export default PanelApplications;
