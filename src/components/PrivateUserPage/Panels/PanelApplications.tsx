import {
  Box,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  VStack,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  useColorModeValue,
  Button,
  CloseButton,
  Center,
  Divider,
  FormErrorMessage,
  IconButton,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiTrash2 } from "react-icons/fi";


interface Props {
  prop: string;
}

const PanelApplications = ({ prop }: Props) => {
  return (
    <>
      <div>PanelApplications</div>
      <div>{prop}</div>
    </>
  );
};

export default PanelApplications;
