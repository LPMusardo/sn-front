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
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AiFillStar } from "react-icons/ai";

interface Props {
  onSubmit: (data: NoteFormData) => void;
}

const AddNote = ({ onSubmit }: Props) => {
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
          <Button
            w="100%"
            variant="outline"
            colorScheme="gray"
            leftIcon={<AiFillStar color="orange" />}
          >
            Grade
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form close={onClose} onSubmitProp={onSubmit} />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddNote;

//-------------------------------------------------------------------

export interface NoteFormData {
  // TODO: faire validation
  value: number;
  title: string;
  comment: string;
}

interface FormProps {
  close: () => void;
  onSubmitProp: (data: NoteFormData) => void;
}

const Form = ({ close, onSubmitProp }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({ mode: "onChange" });

  function onSubmit(data: NoteFormData) {
    onSubmitProp(data);
    close();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card size="sm" maxW={{ sm: "230px", lg: "350px" }} variant="outline">
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
                {...register("value")}
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
