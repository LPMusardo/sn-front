import {
  Box, Text, Divider, Card, CardBody, CardHeader, Heading, HStack, VStack, FormControl, FormHelperText, FormLabel, Input, Select, useColorModeValue, Button, CloseButton, Center, FormErrorMessage, IconButton,
} from "@chakra-ui/react";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import { useContext, useEffect } from "react";
import { SearchContext } from "./SearchContextProvider";
import { getStringLocalDateTime } from "../../services/dateService";
import { useLocation } from "react-router-dom";
import { FormulaireData, buildRequestObj } from './EventListPage'
import { useFetchSearch } from "./FetchSearchContextProvider";
import { useSearchParams } from "react-router-dom";
import { useCategories } from "../CategoriesContextProvider";



interface Props {
  close: () => void;
}



const FiltersPanel = ({ close }: Props) => {


  //----------------------------- Colors  -----------------------------
  const bg = useColorModeValue("white", "gray.600");
  const label = useColorModeValue("gray.700", "gray.300");


  //----------------------------- Main Categories  -----------------------------
  const [categories] = useCategories();



  //----------------------------- React Hook Form  -----------------------------

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useFormContext<FormulaireData>();


  //----------------------------- DEBUG  -----------------------------
  useEffect(() => {
    console.log("[always]coucou depuis FiltersPanel");
  });



  //----------------------------- Context event_name change -> Input event_name change  -----------------------------
  const [search, setSearch] = useContext(SearchContext);
  useEffect(() => {
    setValue("event_name", search);
  }, [search]);




  //----------------------------- URL change  => Form change (et search aussi) -----------------------------
  const location = useLocation();

  useEffect(() => {
    console.log("la location.search change: to", location.search);
    updateFormFromURL()
    handleSubmit((formObj) => fetchEvents(buildRequestObj(formObj)))();
    // handleSubmit(onSubmit)();
  }, [location.search]);

  function getQueryParams() {
    const baseParams = new URLSearchParams(location.search);
    let params: { [key: string]: string } = {};
    baseParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }



  function updateFormFromURL() {
    //reset();

    let urlParams = getQueryParams();
    // Si event_name est pas dans l'URL demandé alors il doit pas apparaitre dans les input => on l'enlève et si il ets dans l'URL il sera remis juste après
    // setValue("event_name", "");
    // setSearch("")
    console.log("urlParams", urlParams);
    Object.keys(urlParams).forEach((key) => {
      setValue(key as any, urlParams[key]);
      console.log("set", key, typeof urlParams[key], urlParams[key]);
    });

    //Technique afffesue du forum github pour corriger le bug de setValue qui ne fonctionne pas parfois
    setTimeout(() => {
      Object.keys(urlParams).forEach((key) => { setValue(key as any, urlParams[key]); });
    }, 2000);

    if (urlParams.event_name) setSearch(urlParams.event_name)
  }



  //----------------------------- OnSubmit -----------------------------
  const [events, error, isLoading, fetchEvents] = useFetchSearch()
  const [searchParams, setSearchParams] = useSearchParams();
  const onSubmit = (formObj: FieldValues) => {
    console.log("Submit filters from main", buildRequestObj(formObj));
    setSearchParams(buildRequestObj(formObj));
  };



  //----------------------------- JSX -----------------------------
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
      <CardBody pt="2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack align="" spacing={{ sm: "2", md: "10", lg: "20" }}>
            <VStack spacing="4" w="56">

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

              <FormControl isInvalid={errors.username != undefined}>
                <FormLabel color={label}>Organizer</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="Username ..."
                  {...register("username")}
                />
                <FormHelperText>
                  Organizer name must contain this
                </FormHelperText>
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  errors.range_date_min != undefined || errors.range_date_max != undefined
                }
              >
                <FormLabel color={label}>Date</FormLabel>
                <VStack alignItems="flex-start">
                  <Input
                    type="datetime-local"
                    borderColor="gray.400"
                    placeholder="Select Date and Time"
                    defaultValue={getStringLocalDateTime()}
                    {...register("range_date_min")}
                  />
                  <Input
                    type="datetime-local"
                    borderColor="gray.400"
                    placeholder="Select Date and Time"
                    defaultValue={getStringLocalDateTime(730)}
                    {...register("range_date_max")}
                  />
                </VStack>

                <FormHelperText>
                  The range of date possible for the event
                </FormHelperText>
                <FormErrorMessage>
                  {errors.range_date_min?.message + " / " + errors.range_date_max?.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>

            <VStack spacing="4" w="56" alignItems="flex-start">
              <FormControl isInvalid={errors.MainCategoryId != undefined}>
                <FormLabel color={label}>Category</FormLabel>
                <Select
                  w="225px"
                  variant="outline"
                  bg={bg}
                  {...register("MainCategoryId")}
                >
                  <option value={""}>Any</option>
                  {categories.map((categorie) => <option key={categorie.id} value={`${categorie.id}`}>{categorie.name}</option>)}
                </Select>
                <FormErrorMessage>
                  {errors.MainCategoryId?.message}
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

              <FormControl
                isInvalid={
                  errors.range_places_min != undefined ||
                  errors.range_places_max != undefined
                }
              >
                <FormLabel color={label}>Participants Range</FormLabel>
                <HStack>
                  <Input
                    placeholder="from"
                    {...register("range_places_min", {})}
                  />
                  <Input
                    placeholder="to"
                    {...register("range_places_max", {})}
                  />
                </HStack>
                <FormHelperText>
                  The range of participants for the event
                </FormHelperText>
                <FormErrorMessage>
                  {errors.range_places_min?.message +
                    " / " +
                    errors.range_places_max?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.nb_places_wanted != undefined}>
                <FormLabel color={label}># Places needed</FormLabel>
                <Input w="auto"
                  placeholder="wanted"
                  {...register("nb_places_wanted", {})}
                />
                <FormHelperText>
                  Must have these free places
                </FormHelperText>
                <FormErrorMessage>
                  {errors.nb_places_wanted?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.score_host_min != undefined}>
                <FormLabel color={label}>Minimum score organizer </FormLabel>
                <Input w="auto"
                  placeholder="score min"
                  {...register("score_host_min", {})}
                />
                <FormErrorMessage>
                  {errors.score_host_min?.message}
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

              <Center w="100%">
                <Button w="100%" mt="90px" py="6" variant="outline" colorScheme="purple" type="submit">
                  Search
                </Button>
              </Center>

            </VStack>
          </HStack>

          {/* <Divider mt="5" mb="3" />
          <Center w="100%">
            <Button variant="outline" colorScheme="purple" type="submit">
              Search
            </Button>
          </Center> */}
        </form>
      </CardBody>
    </Card>
  );
};

export default FiltersPanel;
