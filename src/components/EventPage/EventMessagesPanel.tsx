import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Flex, Input, Text } from "@chakra-ui/react";
import { IMessage } from "../../models/IMessage";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import Axios from "../../services/caller.service";
import { useLogin } from "../LoginContextProvider";
import { useParams } from "react-router-dom";
import axios from "axios";

interface IChatProps {
  messages: IMessage[];
  id: string;
}

const Chat = ({ messages }: IChatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const table = useLogin();
  const userData = table[5]();

  const { id } = useParams();

  const [newMessage, setNewMessage] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
      // .then(()=>{
      //   if (ref && ref.current) ref.current.scrollTop = ref.current.scrollHeight;
      // });
    }
  };

  const sendMessage = async () => {
    if (newMessage === "") return;
    Axios.post("/messages", {
      userId: userData?.id,
      eventId: id,
      content: newMessage,
    });
    // clear the input field
    setNewMessage("");
  };

  useLayoutEffect(() => {
    if (ref && ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages.length]);

  return (
    <>
      <Accordion allowToggle mx={10}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Chat{" "}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box boxShadow="md" borderRadius="md" padding={4} mx={10}>
              <Box
                maxH={"500px"}
                overflowY={"scroll"}
                boxShadow="md"
                borderRadius="md"
                ref={ref}
              >
                {messages.map((message) => (
                  <Flex key={message.id} alignItems="center" marginBottom={4}>
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
              </Box>

              <Input
                placeholder="Type your message"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Box>{" "}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Chat;
