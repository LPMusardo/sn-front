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
} from "@chakra-ui/react";
import { ReactElement, useContext } from "react";
import { MyEventsContext } from "./MyEventsContextProvider";

interface Props {
  children?: any;
  heading?: string;
}

const PanelContainer = ({ children, heading }: Props) => {
  
  const [events, reloadEvents, isLoading] = useContext(MyEventsContext)

  return (
    <Card variant="outline" size="sm" overflow="hidden">
      <CardHeader pb="0">
        <Heading size="lg">{heading}</Heading>
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
