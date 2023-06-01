import {
  Avatar,
  HStack,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  username: string;
  pictureUrl: string;
  id: string;
}

const NoteCard = ({ username, pictureUrl, id }: Props) => {
  return (
    <HStack>
      <Avatar size="sm" name={username} src={pictureUrl} />
      <Link to={`/users/${id}`}>
        <Text>{username}</Text>
      </Link>
    </HStack>
  );
};

export default NoteCard;
