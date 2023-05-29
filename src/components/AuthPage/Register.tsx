import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  //Link
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
//import React from 'react';
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAxiosFetch } from '../../services/useAxiosFetch';


function Register() {

  const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
      confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
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


  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    password: '',
  })


  const onChange = (e: { target: { name: string; value: string; }; }) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }
  

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault
    axios.post('http://localhost:3000/users/signup', credentials)
      .then(res => {
        console.log(res)
        navigate('/login')
      })
      .then(error => console.log(error))

    /*const [data, error, loading] = useAxiosFetch({
      method: "POST",
      url: "/users/signup",
      data: credentials,
    });

    useEffect(() => {
      if (data) {
        console.log(data);
        navigate('/login')
      } else {
        console.log([]);
      }
    }, [data]);
  
    useEffect(() => {
      if (error) {
        console.log(error);
      }
    }, [error]);
  
    useEffect(() => {
      if (loading) {
      }
    }, [loading]);*/
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to participate in events ✌️
          </Text>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Stack spacing={4}>



              <FormControl id="email" isInvalid={errors.email != undefined}>
                <FormLabel>Email</FormLabel>
                <Input  {...register("email")} value={credentials.email} onChange={onChange} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="username" isInvalid={errors.username != undefined}>
                <FormLabel>Username</FormLabel>
                <Input  {...register("username")} value={credentials.username} onChange={onChange} />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password != undefined}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={credentials.password} {...register("password")} onChange={onChange} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>

              </FormControl>

              <FormControl id="conf_password" isInvalid={errors.confirmPassword != undefined}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} {...register("confirmPassword")}  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>

              </FormControl>


              <Stack spacing={10} pt={2}>
                <Button
                  type='submit'
                  loadingText="Registration..."
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already have a account ?
                  <Link style={{ color: 'blue' }} to='/login'>
                    Login
                  </Link>

                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

export default Register;