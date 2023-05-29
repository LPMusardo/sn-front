import {
  Box,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import MenuItem from "./MenuItem";
import { IconType } from "react-icons";
import { useLogin } from "../../LoginContextProvider";
import { useNavigate } from "react-router-dom";




interface Props{
    sections : { id: number; h: string; t: string; icon:IconType, panel:any }[]
    selectedId: number,
    setSelectedId: Function,
}

const Menu = ({sections, selectedId, setSelectedId}:Props) => {

  const navigate = useNavigate();

  const txtColor = useColorModeValue("gray.600", "gray.400");
  const [isLogged, isL, e, login, logout, getUserData] = useLogin(); 
  const user = getUserData()


  return (
    <Card variant="outline" size="sm" overflow="hidden">
      <CardHeader pb="0">
        <Heading size="lg">{user && user.username}</Heading>
      </CardHeader>

      <CardBody>
        <Divider mb="5" />
        <Stack divider={<StackDivider />} spacing="4">
          {sections.map((section) => (
            <MenuItem
              isActive={section.id == selectedId}
              //onSelect={() => setSelectedId(section.id)}
              onSelect={() => navigate(`/profile/${section.id}`)}
              onClick={() => {}}
              key={section.id}
            >
              <Flex justifyContent="left" w="100%" direction="column">
                <HStack>
                  <section.icon />
                  <Heading size="sm" textTransform="uppercase" w="min-content">
                    {section.h}
                  </Heading>
                </HStack>
                <Text pt="2" fontSize="sm" w="min-content" color={txtColor}>
                  {section.t}
                </Text>
              </Flex>
            </MenuItem>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Menu;
