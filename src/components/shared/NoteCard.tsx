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
  Avatar,
  HStack,
} from "@chakra-ui/react";

interface Props {
  username: string;
  pictureUrl: string;
}

const NoteCard = ({ username, pictureUrl }: Props) => {
  return (
    <HStack>
      <Avatar size="sm" name={username} src={pictureUrl} />
      <Text>{username}</Text>
    </HStack>
  );
};

export default NoteCard;
