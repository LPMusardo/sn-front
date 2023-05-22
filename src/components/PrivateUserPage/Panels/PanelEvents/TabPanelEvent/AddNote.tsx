import {
  Box,
  Button,
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  HStack,
  VStack,
  Textarea,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { FieldValues, useForm } from "react-hook-form";

interface FormData{ // TODO: faire validation
    title: string
    comment: string
    grade : number
}

const AddNote = () => {
    const [isEditing, setEditing] = useState(false);
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({ mode: "onChange" });

    const onSubmit = (data: FieldValues) =>{
        console.log(data);
    }

  return isEditing ? (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card size="sm" maxW={{ sm: "230px", lg: "350px" }} variant="elevated">
          {/* <CardHeader></CardHeader> */}
          <CardBody>
            <VStack>
              <FormControl>
                <FormLabel>Grade</FormLabel>
                <Input
                  defaultValue={4}
                  type="number"
                  min="0"
                  max="5"
                  w="20"
                  size={"sm"}
                  {...register("grade")}
                >
                  
                </Input>
                <FormHelperText>from 0 to 5</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Grade title here" size="sm" {...register("title")}/>
              </FormControl>
              <FormControl>
                <FormLabel>Comment</FormLabel>
                <Textarea
                  placeholder="Your comemnt here"
                  size="sm"
                  resize="none"
                  {...register("comment")}
                />
              </FormControl>
            </VStack>
          </CardBody>
          <CardFooter justify="space-between">
            <Button
              onClick={() => setEditing(false)}
              variant="ghost"
              leftIcon={<ImCancelCircle />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="ghost"
              leftIcon={<AiOutlineCheckCircle />}
            >
              Send
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Box>
  ) : (
    <Button onClick={() => setEditing(true)}>Grade</Button>
  );
};

export default AddNote;
