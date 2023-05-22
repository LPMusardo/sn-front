import {
  Button,
  Flex,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  placeholder?: string;
  defaultValue?: number;
  register: Function;
}

function CustomNumberInput({ placeholder, defaultValue, register }: Props) {
  const bg = useColorModeValue("white", "gray.600");


  return (
    <NumberInput step={5}>
      <NumberInputField placeholder={placeholder} {...register()} w="110px" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}

export default CustomNumberInput;
