import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";

interface FormData {
  // TODO: faire validation
  title: string;
  comment: string;
  grade: number;
}

const AddNote = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button>Grade</Button>
        </PopoverTrigger>
        <PopoverContent p={5}>

            <PopoverArrow />
            <PopoverCloseButton />
            <Form close={onClose} />

        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddNote;

const Form = ({ close }: { close: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card size="sm" maxW={{ sm: "230px", lg: "350px" }} variant="outline">
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
              ></Input>
              <FormHelperText>from 0 to 5</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Grade title here"
                size="sm"
                {...register("title")}
              />
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
          <ButtonGroup display="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">
              Save
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </form>
  );
};
