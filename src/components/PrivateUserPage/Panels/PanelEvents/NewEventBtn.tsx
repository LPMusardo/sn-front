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
import * as dateService from "../../../../services/dateService";
import { FiTrash2 } from "react-icons/fi";
import { NewEvent, useMyEvents } from "../../MyEventsContextProvider";
import { useCategories } from "../../../CategoriesContextProvider";



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


//------------------------------------------------------------------



const schema = z.object({
  name: z.string().min(5).max(25),
  participants_number: z.number().min(1),
  category: z.string().min(1).max(25),
  mainCategoryId: z.enum(["1", "2", "3"]), //TODO utiliser le contexte main category
  description: z.string().min(1).max(300),
  image_url: z.string().url(),
  date: z.coerce.date(),
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  zip: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

const Form = ({ close }: { close: () => void }) => {

  const [categories] = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const [events, isLoading, error, AddNote, submitNewEvent] = useMyEvents();

  function buildRequestObj(formObj:FormData) {
    const requestObj:any = {...formObj, date:formObj.date.toISOString(), mainCategoryId:(Number.parseInt(formObj.mainCategoryId)|| 0),  address:{street:formObj.street, city:formObj.city, country:formObj.country, zip:formObj.zip} }
    delete requestObj.street;
    delete requestObj.city;
    delete requestObj.country;
    delete requestObj.zip;
    return requestObj;
  }

  

  function onSubmit(newForm:FormData){
    console.log(buildRequestObj(newForm));
    submitNewEvent(buildRequestObj(newForm))
    close()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading size="sm">Create New Event</Heading>
      <Divider mt="13px" mb="10px" />
      <HStack alignItems="flex-start" spacing={{ sm: "5", md: "10" }}>
        <VStack spacing="4" alignItems="flex-start" maxW="220px">
          <FormControl isInvalid={errors.name != undefined}>
            <FormLabel>Event Name</FormLabel>
            <Input
              size="sm"
              type="text"
              borderColor="gray.400"
              placeholder="Event name..."
              {...register("name")}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.participants_number != undefined}>
            <FormLabel>Participant Number</FormLabel>
            <Input
              size="sm"
              type="number"
              borderColor="gray.400"
              placeholder="Size..."
              {...register("participants_number", { valueAsNumber: true })}
            />
            <FormErrorMessage>
              {errors.participants_number?.message}
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
          <FormControl isInvalid={errors.mainCategoryId != undefined}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder=""
              variant="filled"
              {...register("mainCategoryId")}
            >
              {categories.map((categorie)=><option key={categorie.id} value={`${categorie.id}`}>{categorie.name}</option>)}
            </Select>
            <FormErrorMessage>{errors.mainCategoryId?.message}</FormErrorMessage>
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
