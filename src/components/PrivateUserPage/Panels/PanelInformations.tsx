import {
  HStack,
  VStack,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useColorModeValue,
  Button,
  Center,
  FormErrorMessage,
  Grid,
  GridItem,
  Text,
  Heading,
  Spinner,
  Avatar,
  Link,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GiCancel } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useMyInformations } from "../MyInformationsContextProvider";
import { Link as ReachLink } from "react-router-dom"


const schema = z
  .object({
    // creationDate : z.string().default(initialData.creationDate), //tjrs défini ici car non visible
    username: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .min(5, { message: "5 characteres minimum" }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(60, { message: "This input is to long" })
      .regex(new RegExp(/^.*@.*$/), "This is not a valid email."),
    //.email() ne marche pas avec les adresse AMU
    picture: z.union([
      z.string().length(0, { message: "Empty or valid URL" }),
      z.string().url({ message: "Empty or valid URL" }),
    ]),
    bio: z.string(),
    password: z.string(),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["password"],
  });

type FormData = z.infer<typeof schema>;

function buildRequestObj(formObj: any) {
  const requestObj = { ...formObj };
  delete requestObj.password;
  delete requestObj.confirmpassword;
  if (!formObj.password || !formObj.confirmpassword) return requestObj;
  requestObj.password = {
    password: formObj.password,
    confirmpassword: formObj.confirmpassword,
  };
  return requestObj;
}

const PanelInformations = () => {
  const [isEditing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
  });

  const [initialData, isLoading, error, submitUser, setDefaultFormValues] =
    useMyInformations();

  useEffect(() => {
    setDefaultFormValues(reset);
  }, []);

  const label = useColorModeValue("gray.700", "gray.300");
  const since_color = useColorModeValue("gray.500", "gray.500");

  const onSubmit = (formObj: { [key: string]: any }) => {
    submitUser(buildRequestObj(formObj))
    console.log(buildRequestObj(formObj));
    reset({ ...formObj, password: "", confirmpassword: "" }); //reset default values
    setEditing(false);
  };

  const allowSave = () => {
    return isValid && isDirty;
  };

  return (
    <>
      <Heading size="md" color="red">{error}</Heading>
      {isLoading && <Spinner />}
      <HStack spacing="5" pl="7">
        <HStack spacing="2">
          <Avatar size="sm" name={initialData.username} src={initialData.picture ? initialData.picture : ""} />
          <Link as={ReachLink} to={`/users/${initialData.id}`} color="#2256A0" >{initialData.username}</Link>
        </HStack>
        <Text color={since_color}>
          Since {new Date(initialData.creation_date).toLocaleString()}
        </Text>
      </HStack>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleSubmit(() => console.log(dirtyFields))}
      >
        <Grid templateColumns={{ sm: "1fr", lg: "1fr 1fr" }} gap={6} p="8">
          <GridItem>
            <VStack spacing="10">
              <FormControl isInvalid={errors.username != undefined}>
                <FormLabel color={label}>Username</FormLabel>
                <Input
                  type="text"
                  {...register("username")}
                  readOnly={!isEditing}
                />
                <FormHelperText>This is your username</FormHelperText>
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email != undefined}>
                <FormLabel color={label}>Mail</FormLabel>
                <Input
                  type="text"
                  {...register("email")}
                  readOnly={!isEditing}
                />
                <FormHelperText>This is your email</FormHelperText>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.password != undefined}
                hidden={!isEditing}
              >
                <FormLabel color={label}>Password</FormLabel>
                <Input type="password" {...register("password")} />
                <FormHelperText>Your password</FormHelperText>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack spacing="10">
              <FormControl isInvalid={errors.picture != undefined}>
                <FormLabel color={label}>Picture URL</FormLabel>
                <Input
                  type="text"
                  {...register("picture")}
                  readOnly={!isEditing}
                />
                <FormHelperText>Image URL for your picture</FormHelperText>
                <FormErrorMessage>{errors.picture?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.bio != undefined}>
                <FormLabel color={label}>Description</FormLabel>
                <Input type="text" {...register("bio")} readOnly={!isEditing} />
                <FormHelperText>This is your public description</FormHelperText>
                <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.confirmpassword != undefined}
                hidden={!isEditing}
              >
                <FormLabel color={label}>Confirm Password</FormLabel>
                <Input type="password" {...register("confirmpassword")} />
                <FormHelperText>Confirm your Password here</FormHelperText>
                <FormErrorMessage>
                  {errors.confirmpassword?.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </GridItem>
        </Grid>
        <Center>
          {isEditing && (
            <HStack spacing="4">
              <Button
                variant="outline"
                colorScheme="gray"
                leftIcon={<GiCancel />}
                onClick={() => {
                  reset(), setEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                isDisabled={!allowSave()}
                variant="outline"
                colorScheme="purple"
                type="submit"
              >
                Save Changes
              </Button>
            </HStack>
          )}
          {!isEditing && (
            <Button
              type="submit"
              variant="outline"
              colorScheme="purple"
              onClick={() => setEditing(true)}
            >
              Edit Informations
            </Button>
          )}
        </Center>
      </form>
    </>
  );
};

export default PanelInformations;
