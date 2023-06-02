import {
  Link, Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, FormErrorMessage, HStack, useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
//import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Axios from "../../services/caller.service";
import { Link as ReachLink } from "react-router-dom"



const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(60, { message: "This input is to long" })
      .regex(new RegExp(/^.*@.*$/), "This is not a valid email."),
    username: z
      .string()
      .min(1, { message: "Username is required" }),
    password: z
      .string()
      .min(4, { message: "at least 4 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["password"],
  });

type ValidationSchema = z.infer<typeof schema>;




function Register() {

  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema), mode: "onChange", shouldFocusError: false,
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast()
  useEffect(() => {
    if (error) {
      toast.closeAll();
      toast({
        title: 'Error Encountered',
        description: error,
        status: 'error',
        isClosable: true,
        duration: 1000,
      });
    }
  }, [error])


  const onSubmit = async (formData: ValidationSchema) => {
    const submitFormDate: any = { ...formData }
    delete submitFormDate.confirmPassword;
    setError("")
    setLoading(true)
    Axios.post("/users/signup", submitFormDate)
      .then((res) => {        
        navigate("/login");
      })
      .catch((error) => { console.log(error); setError(error.message) })
      .finally(() => setLoading(false));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} >
        <Stack align={"center"} >
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to participate in events ✌️
          </Text>
        </Stack>
        {/* <Heading size="md" color="red">{error}</Heading> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={handleSubmit(() => console.log("refresh form"))}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errors.email != undefined}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="username"
                isInvalid={errors.username != undefined}
              >
                <FormLabel>Username</FormLabel>
                <Input
                  {...register("username")}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={errors.password != undefined}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="conf_password"
                isInvalid={errors.confirmPassword != undefined}
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  loadingText="Registration..."
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <HStack pt={6}>
                <Text align={"center"}>
                  Already have a account ?
                </Text>
                <Box ml="3px">
                  <Link as={ReachLink} to="/login" color="#0653CC" >
                    Sign up
                  </Link>
                </Box>
              </HStack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

export default Register;
