import { Box, Flex, HStack, Image, useColorModeValue } from "@chakra-ui/react";
import logo from "../assets/logo3.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import ProfileButton from "./ProfileButton";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <Flex
      padding="10px"
      flexDirection="row"
      align="center"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Image src={logo} boxSize="60px" />
      <Box w="100%" marginX={10}>
        <SearchInput onSearch={onSearch} />
      </Box>
      <ColorModeSwitch />
      <Box paddingX={5}>
        <ProfileButton />
      </Box>
    </Flex>
  );
};

export default NavBar;
