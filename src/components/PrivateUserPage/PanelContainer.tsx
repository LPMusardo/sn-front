import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Divider,
  Stack,
  StackDivider,
  MenuItem,
  Flex,
  Text,
  Spinner,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { ReactElement, useContext } from "react";
import { MyEventsContext } from "./MyEventsContextProvider";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  children?: any;
  extra?: ReactElement ;
  heading?: string;
}

const PanelContainer = ({ children, heading, extra }: Props) => {
  
  const [events, reloadEvents, isLoading] = useContext(MyEventsContext)

  return (
    <Card variant="outline" size="sm" >
      <CardHeader pb="0">
        <Flex justifyContent={"space-between"} px="3">
          <Heading size="lg">{heading}</Heading>
          {extra}
        </Flex>

        {isLoading && <Spinner />}
      </CardHeader>

      <CardBody>
        <Divider mb="5" />
        {children}
      </CardBody>
    </Card>
  );
};

export default PanelContainer;
