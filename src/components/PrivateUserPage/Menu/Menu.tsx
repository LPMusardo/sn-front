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



interface Props{
    sections : { id: number; h: string; t: string; icon:IconType, panel:any }[]
    selectedId: number,
    setSelectedId: Function,
}

const Menu = ({sections, selectedId, setSelectedId}:Props) => {
  const txtColor = useColorModeValue("gray.600", "gray.400");
  


  return (
    <Card variant="outline" size="sm" overflow="hidden">
      <CardHeader pb="0">
        <Heading size="lg">[username]</Heading>
      </CardHeader>

      <CardBody>
        <Divider mb="5" />
        <Stack divider={<StackDivider />} spacing="4">
          {sections.map((section) => (
            <MenuItem
              isActive={section.id == selectedId}
              onSelect={() => setSelectedId(section.id)}
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
