import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
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
import {  useParams } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom"


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
                borderRadius="md"
                ref={ref}
              >
                {messages.map((message) => (
                  <Flex my="2px" alignContent="space-between" w="100%">
                    <Flex  key={message.id} w="100%"  marginBottom={4}>

                      <Avatar
                        name={message.owner.username}
                   src={message.owner.picture || ""}
                        boxSize={12}
                        borderRadius="full"
                        marginX={4}
                        />
                      <Box>
                      <Link as={ReachLink} to={`/users/${message.userId}`}>
                        <Text fontWeight="bold">{message.owner.username}</Text>
                        </Link>
                      
                        <Text>{message.content}</Text>
                      </Box>
                    </Flex>
                    <Box>
                      <Text whiteSpace="nowrap" color="gray.500" marginRight="5" >{new Date(message.creationDate).toLocaleString()}</Text>
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
