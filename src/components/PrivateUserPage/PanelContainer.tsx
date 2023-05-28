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
import { ReactElement, useContext, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  setSection : ()=>void
  children?: any;
  extra?: ReactElement;
  heading?: string;
}

const PanelContainer = ({ children, heading, extra, setSection}: Props) => {

  useEffect(()=>{
    setSection();
  })

  return (
    <Card variant="outline" size="sm" w="100%">
      <CardHeader pb="0">
        <Flex justifyContent={"space-between"} px="3">
          <Heading size="lg">{heading}</Heading>
          {extra}
        </Flex>
      </CardHeader>
      <CardBody>
        <Divider mb="5" />
        {children}
      </CardBody>
    </Card>
  );
};

export default PanelContainer;
