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
import CustomNumberInput from "./CustomNumberInput";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiTrash2 } from "react-icons/fi";
import { useContext, useEffect } from "react";
import { SearchContext } from "./SearchContextProvider";

const schema = z.object({
  event_name: z.string(),
  description: z.string(),
  category: z.string(),
  date_min: z.coerce.date(), // max>min
  date_max: z.coerce.date(),
  main_category: z.enum(["1", "2", "3", ""]),
  participants_min: z.string().regex(/^[0-9]*$/), //max>min
  participants_max: z.string().regex(/^[0-9]*$/),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  zip: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  close: () => void;
}

function buildRequestObj(formObj: { [key: string]: any }) {
  const requestObj: { [key: string]: any } = {};
  for (const key in formObj) {
    if (!formObj[key]) continue;
    if (key.includes("date")) {
      requestObj[key] = formObj[key].toISOString();
    } else requestObj[key] = formObj[key];
  }
  return requestObj;
}

function getStringLocalDateTime(offsetInDays: number = 0) {
  const MIN_TO_MS = 60 * 1_000;
  const DAY_TO_MS = 24 * 60 * 60 * 1_000;
  let tzoffset = new Date().getTimezoneOffset(); //offset in milliseconds
  let localISOTime = new Date(
    Date.now() + offsetInDays * DAY_TO_MS - tzoffset * MIN_TO_MS
  )
    .toISOString()
    .slice(0, 16);
  // alert(localISOTime)
  return localISOTime;
}

const FiltersPanel = ({ close }: Props) => {
  const [search, setSearch] = useContext(SearchContext);
  //const watchEventName = watch("event_name"); // Surveiller la valeur de field1

  useEffect(() => {
    setValue("event_name", search);
  }, [search]);

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const bg = useColorModeValue("white", "gray.600");
  const label = useColorModeValue("gray.700", "gray.300");

  const onSubmit = (formObj: FieldValues) => {
    console.log(buildRequestObj(formObj));
  };

  return (
    <Card my="2" variant="filled">
      <CardHeader pb="0">
        <HStack>
          <CloseButton size="sm" onClick={close} />
          <IconButton
            variant="ghost"
            colorScheme="gray"
            onClick={() => {
              reset(), setSearch("");
            }}
            icon={<FiTrash2 />}
            aria-label="reset form"
          />
          <Heading size="sm">Event filters</Heading>
        </HStack>
      </CardHeader>
      <CardBody pb="3" pt="2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack align="" spacing={{ sm: "2", md: "10", lg: "20" }}>
            <VStack spacing="4">
              <FormControl isInvalid={errors.event_name != undefined}>
                <FormLabel color={label}>Name</FormLabel>

                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="Event name..."
                  {...register("event_name", {
                    onChange: (e) => {
                      setSearch(e.target.value);
                    },
                  })}
                />

                <FormHelperText>
                  The event name must contain this
                </FormHelperText>
                <FormErrorMessage>
                  {errors.event_name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description != undefined}>
                <FormLabel color={label}>Description</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="Description..."
                  {...register("description")}
                />
                <FormHelperText>
                  The event description must contain this
                </FormHelperText>
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.category != undefined}>
                <FormLabel color={label}>Sub-Category</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="Sub-Category name..."
                  {...register("category")}
                />
                <FormHelperText>
                  Sub-Category name must contain this
                </FormHelperText>
                <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack spacing="4" alignItems="flex-start">
              <FormControl
                isInvalid={
                  errors.date_min != undefined || errors.date_max != undefined
                }
              >
                <FormLabel color={label}>Date</FormLabel>
                <VStack alignItems="flex-start">
                  <Input
                    type="datetime-local"
                    borderColor="gray.400"
                    placeholder="Select Date and Time"
                    width="56"
                    defaultValue={getStringLocalDateTime()}
                    {...register("date_min")}
                  />
                  <Input
                    type="datetime-local"
                    borderColor="gray.400"
                    placeholder="Select Date and Time"
                    width="56"
                    defaultValue={getStringLocalDateTime(365)}
                    {...register("date_max")}
                  />
                </VStack>
                <FormHelperText>
                  The range of date possible for the event
                </FormHelperText>
                <FormErrorMessage>
                  {errors.date_min?.message + " / " + errors.date_max?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.main_category != undefined}>
                <FormLabel color={label}>Category</FormLabel>
                <Select
                  w="225px"
                  placeholder=""
                  variant="filled"
                  bg={bg}
                  {...register("main_category")}
                >
                  <option value={""}>Any</option>
                  <option value={"1"}>Option 1</option>
                  <option value={"2"}>Option 2</option>
                  <option value={"3"}>Option 3</option>
                </Select>
                <FormHelperText>
                  Choose the Category of the event
                </FormHelperText>
                <FormErrorMessage>
                  {errors.main_category?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  errors.participants_min != undefined ||
                  errors.participants_max != undefined
                }
              >
                <FormLabel color={label}>Participants Range</FormLabel>
                <HStack>
                  <CustomNumberInput
                    placeholder="from"
                    register={() => {
                      return register("participants_min", {});
                    }}
                  />
                  <CustomNumberInput
                    placeholder="to"
                    register={() => register("participants_max", {})}
                  />
                </HStack>
                <FormHelperText>
                  The range of participants for the event
                </FormHelperText>
                <FormErrorMessage>
                  {errors.participants_min?.message +
                    " / " +
                    errors.participants_max?.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>

            <VStack spacing="4" alignItems="flex-start">
              <FormControl isInvalid={errors.street != undefined}>
                <FormLabel color={label}>Street</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="Street..."
                  {...register("street")}
                />
                <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.city != undefined}>
                <FormLabel color={label}>City</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="City..."
                  {...register("city")}
                />
                <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.country != undefined}>
                <FormLabel color={label}>Country</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="Country..."
                  {...register("country")}
                />
                <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.zip != undefined}>
                <FormLabel color={label}>ZIP Code</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="ZIP code..."
                  {...register("zip")}
                />
                <FormErrorMessage>{errors.zip?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
          </HStack>
          <Divider mt="5" mb="3" />
          <Center w="100%">
            <Button variant="outline" colorScheme="purple" type="submit">
              Search
            </Button>
          </Center>
        </form>
      </CardBody>
    </Card>
  );
};

export default FiltersPanel;
