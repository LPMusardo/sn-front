import {
  Box,
  Divider,
  FormErrorMessage,
  HStack,
  Heading,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
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
import * as dateService from "../../../../assets/services/dateService";
import { FiTrash2 } from "react-icons/fi";

const NewEventBtn = () => {
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
          <IconButton aria-label="new event" icon={<AiOutlinePlus />} />
        </PopoverTrigger>
        <PopoverContent p={5} height="max-content" w="100%" my="3">
          <PopoverArrow />
          <PopoverCloseButton />
          <Form close={onClose} />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NewEventBtn;

const schema = z.object({
  event_name: z.string().min(5).max(25),
  participant_number: z.number().min(1),
  category: z.string().min(1).max(25),
  main_category: z.enum(["1", "2", "3"]), //TODO utiliser le contexte main category
  description: z.string().min(1).max(300),
  image_url: z.string().optional(),
  date: z.coerce.date(),
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  zip: z.string(),
});

type FormData = z.infer<typeof schema>;

function buildRequestObj(formObj: { [key: string]: any }) {
  const requestObj: { [key: string]: any } = {};
  for (const key in formObj) {
    if (key.includes("date")) {
      requestObj[key] = formObj[key].toISOString();
    } else requestObj[key] = formObj[key];
  }
  return requestObj;
}

const Form = ({ close }: { close: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = (data: FieldValues) => {
    console.log(buildRequestObj(data));
    //TODO then reload list of my events
    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading size="sm">Create New Event</Heading>
      <Divider mt="13px" mb="10px" />
      <HStack alignItems="flex-start" spacing={{ sm: "5", md: "10" }}>
        <VStack spacing="4" alignItems="flex-start" maxW="220px">
          <FormControl isInvalid={errors.event_name != undefined}>
            <FormLabel>Event Name</FormLabel>
            <Input
              size="sm"
              type="text"
              borderColor="gray.400"
              placeholder="Event name..."
              {...register("event_name")}
            />
            <FormErrorMessage>{errors.event_name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.participant_number != undefined}>
            <FormLabel>Participant Number</FormLabel>
            <Input
              size="sm"
              type="number"
              borderColor="gray.400"
              placeholder="Size..."
              {...register("participant_number", { valueAsNumber: true })}
            />
            <FormErrorMessage>
              {errors.participant_number?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.category != undefined}>
            <FormLabel>Sub Category</FormLabel>
            <Input
              size="sm"
              type="text"
              borderColor="gray.400"
              placeholder="Sub category..."
              {...register("category")}
            />
            <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.main_category != undefined}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder=""
              variant="filled"
              {...register("main_category")}
            >
              <option value={"1"}>Option 1</option>
              <option value={"2"}>Option 2</option>
              <option value={"3"}>Option 3</option>
            </Select>
            <FormErrorMessage>{errors.main_category?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.description != undefined}>
            <FormLabel>Description</FormLabel>
            <Input
              size="sm"
              type="text"
              borderColor="gray.400"
              placeholder="description..."
              {...register("description")}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.date != undefined}>
            <FormLabel>Date</FormLabel>
            <Input
              type="datetime-local"
              placeholder="Select Date and Time"
              defaultValue={dateService.getStringLocalDateTime()}
              {...register("date")}
            />
            <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
          </FormControl>
        </VStack>

        <VStack spacing="4" alignItems="flex-start" maxW="130px">
          <FormControl isInvalid={errors.image_url != undefined}>
            <FormLabel>Image URL</FormLabel>
            <Input
              size="sm"
              type="text"
              borderColor="gray.400"
              placeholder="Image url..."
              {...register("image_url")}
            />
            <FormErrorMessage>{errors.image_url?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.street != undefined}>
            <FormLabel>Street</FormLabel>
            <Input
              size="sm"
              type="text"
              borderColor="gray.400"
              placeholder="Street..."
              {...register("street")}
            />
            <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.city != undefined}>
            <FormLabel>City</FormLabel>
            <Input
              size="sm"
              type="text"
              borderColor="gray.400"
              placeholder="City..."
              {...register("city")}
            />
            <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.country != undefined}>
            <FormLabel>Country</FormLabel>
            <Input
              size="sm"
              type="text"
              borderColor="gray.400"
              placeholder="Country..."
              {...register("country")}
            />
            <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.zip != undefined}>
            <FormLabel>ZIP Code</FormLabel>
            <Input
              size="sm"
              type="text"
              borderColor="gray.400"
              placeholder="ZIP code..."
              {...register("zip")}
            />
            <FormErrorMessage>{errors.zip?.message}</FormErrorMessage>
          </FormControl>
          <Box pt="10">
            <IconButton
            mr="6px"
              variant="ghost"
              colorScheme="gray"
              onClick={() => reset()}
              icon={<FiTrash2 />}
              aria-label="reset form"
            />
            <Button type="submit" colorScheme="teal">
              Save
            </Button>
          </Box>
        </VStack>
      </HStack>
    </form>
  );
};
