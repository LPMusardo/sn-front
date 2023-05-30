import {
  Link, Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text, useColorModeValue, Spinner, FormErrorMessage, HStack,
} from "@chakra-ui/react";
import { useLogin } from "../LoginContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link as ReachLink } from "react-router-dom"

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(60, { message: "This input is to long" })
    .regex(new RegExp(/^.*@.*$/), "This is not a valid email."),
  password: z.string().min(4, { message: "At least 4 characters" }),
});
type ValidationSchema = z.infer<typeof schema>;

function Login() {
  const [isLogged, isLoading, error, login, logout] = useLogin();

  const { register, handleSubmit, formState: { errors },

  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
          {error && (
            <Heading size="md" color="red">
              {error}
            </Heading>
          )}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit((formData) => login(formData))}>
              <FormControl id="email" isInvalid={errors.email != undefined}>
                <FormLabel>Email</FormLabel>
                <Input {...register("email")} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="password"
                isInvalid={errors.password != undefined}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password")} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Stack spacing={10} mt="5">
                <Button
                  isLoading={isLoading}
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  Login
                </Button>
              </Stack>
              <HStack pt={6}>
                <Text align={"center"}>
                  Not registered ?
                </Text>
                <Box ml="3px">
                  <Link as={ReachLink} to="/signup" color="#0653CC" >
                    Sign up
                  </Link>
                </Box>
              </HStack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
