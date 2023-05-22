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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GiCancel } from "react-icons/gi";
import { useState } from "react";

interface Props {
  prop: string;
}

const schema = z
  .object({
    // creationDate : z.string().default(initialData.creationDate), //tjrs défini ici car non visible
    username: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .min(5, { message: "5 characteres minimum" }),
    mail: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    pictureURL: z.union([
      z.string().length(0, { message: "Empty or valid URL" }),
      z.string().url({ message: "Empty or valid URL" }),
    ]),
    description: z.string(),
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["password"],
  });

type FormData = z.infer<typeof schema>;

function buildRequestObj(formObj: { [key: string]: any }) {
  const requestObj: { [key: string]: any } = {};
  for (const key in formObj) {
    if ((key.includes("password") || key.includes("confirm")) && !formObj[key])
      continue;
    requestObj[key] = formObj[key];
  }
  return requestObj;
}

const PanelInformations = ({}: Props) => {
  const [isEditing, setEditing] = useState(false);
  const initialData = {
    username: "username12",
    creationDate: "12/12/2022",
    mail: "mail@mail.com",
    pictureURL: "http://picture",
    description: "lorem ipsum lorem ipsum",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues: { ...initialData, password: "", confirm: "" },
  });

  const label = useColorModeValue("gray.700", "gray.300");
  const since_color = useColorModeValue("gray.500", "gray.500");

  const onSubmit = (formObj: { [key: string]: any }) => {
    //envoi au serveur
    console.log(buildRequestObj(formObj));
    //.then() re-fetch les default values, puis
    reset({ ...formObj, password: "", confirm: "" }); //reset default values
    //.then()
    setEditing(false);
  };

  const allowSave = () => {
    return isValid && isDirty;
  };

  return (
    <>
      <Text color={since_color}>Since {initialData.creationDate}</Text>
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

              <FormControl isInvalid={errors.mail != undefined}>
                <FormLabel color={label}>Mail</FormLabel>
                <Input
                  type="text"
                  {...register("mail")}
                  readOnly={!isEditing}
                />
                <FormHelperText>This is your email</FormHelperText>
                <FormErrorMessage>{errors.mail?.message}</FormErrorMessage>
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
              <FormControl isInvalid={errors.pictureURL != undefined}>
                <FormLabel color={label}>Picture URL</FormLabel>
                <Input
                  type="text"
                  {...register("pictureURL")}
                  readOnly={!isEditing}
                />
                <FormHelperText>Image URL for your picture</FormHelperText>
                <FormErrorMessage>
                  {errors.pictureURL?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description != undefined}>
                <FormLabel color={label}>Description</FormLabel>
                <Input
                  type="text"
                  {...register("description")}
                  readOnly={!isEditing}
                />
                <FormHelperText>Image URL for your picture</FormHelperText>
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.confirm != undefined}
                hidden={!isEditing}
              >
                <FormLabel color={label}>Confirm Password</FormLabel>
                <Input type="password" {...register("confirm")} />
                <FormHelperText>Confirm your Password here</FormHelperText>
                <FormErrorMessage>{errors.confirm?.message}</FormErrorMessage>
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
