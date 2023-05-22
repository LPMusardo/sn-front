import { Box, Flex, Image, Link, useColorModeValue } from "@chakra-ui/react";
import logo from "../../../assets/logo3.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { ReactElement } from "react";

interface Props {
  onSearch: (searchText: string) => void;
  searchInput?: ReactElement;
}

const NavBar = ({ onSearch, searchInput}: Props) => {
  const navigate = useNavigate();
  return (
    <Flex
      padding="10px"
      flexDirection="row"
      align="center"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Link as={ReachLink} to="/">
        <Box w="max-content">
          <Image src={logo} boxSize="60px" onClick={() => navigate("/")} />
        </Box>
      </Link>
      <Box w="100%" marginX={10}>
        {searchInput|| <SearchInput onSearch={onSearch}/>}
      </Box>
      <ColorModeSwitch />
      <Box paddingX={5}>
        <ProfileButton />
      </Box>
    </Flex>
  );
};

export default NavBar;
