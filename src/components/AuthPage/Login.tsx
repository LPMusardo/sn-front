import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../LoginContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function Login() {

  const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" }),
  });
  
  type ValidationSchema = z.infer<typeof schema>;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });


  const navigate = useNavigate();
  const [isLogged, isLoading, error, login, logout] = useLogin();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: { target: { name: string; value: string } }) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (data:any) => {
    login(credentials);

    // accountService
    //   .login(credentials)
    //   .then((res) => {
    //     accountService.saveToken(res.data.token);
    //     navigate("/");
    //   })
    //   .catch((error) => console.log(error));
  };

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
          {isLoading && <Spinner/>}
          {error && <Heading size="md" color="red">{error}</Heading>}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email" isInvalid={errors.email != undefined}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register("email")}
                  value={credentials.email}
                  onChange={onChange}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              
              

              <FormControl id="password" isInvalid={errors.password != undefined}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password")}
                  value={credentials.password}
                  onChange={onChange}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              
              

              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Not registered ?
                  <Link style={{ color: "blue" }} to="/signup">
                    Sign up
                  </Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
