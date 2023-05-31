import { Avatar, Box, Flex, Input, Text } from "@chakra-ui/react";
import { IMessage } from "../../models/IMessage";
import { Dispatch, SetStateAction, useState } from "react";
import Axios from "../../services/caller.service";
import { useLogin } from "../LoginContextProvider";
import { useParams } from "react-router-dom";

interface IChatProps {
  messages: IMessage[];
  id: string;
}


const Chat = (
  { messages }: IChatProps,
) => {
  const table = useLogin();
  const userData = table[5]();

  const {id} =useParams();

  const [newMessage, setNewMessage] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    Axios.post("/messages", {
      "userId": userData?.id,
      "eventId": id,
      "content": newMessage,
    });
    // clear the input field
    setNewMessage("");
  };

  return (
    <Box boxShadow="md" borderRadius="md" padding={4} margin={10}>
      {messages.map((message) => (
        <Flex key={message.userId} alignItems="center" marginBottom={4}>
          <Avatar
            src={message.owner.image_url}
            boxSize={12}
            borderRadius="full"
            marginRight={4}
          />
          <Box>
            <Text fontWeight="bold">{message.owner.username}</Text>
            <Text>{message.content}</Text>
          </Box>
        </Flex>
      ))}
      <Input
        placeholder="Type your message"
        marginLeft={4}
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export default Chat;
