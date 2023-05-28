import { Box, Flex, Image, Link, useColorModeValue } from "@chakra-ui/react";
import logo from "../../../assets/logo3.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
// import { accountService } from "../../../services/token.service";
import ConnexionButton from "./ConnexionButton";
import { useLogin } from "../../LoginContextProvider";

type Props = {
  searchInput?: ReactElement;
}

const NavBar = ({searchInput }: Props) => {
  const navigate = useNavigate();
  const [isLogged] = useLogin()

  // const [isLogged, setIsLogged] = useState(accountService.isLogged());
  // const logout = () => setIsLogged(false);

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
        {searchInput || <SearchInput/>}
      </Box>
      <ColorModeSwitch />
      <Box paddingX={5}>
        {isLogged ? (
          <ProfileButton />
        ) : (
          <Link as={ReachLink} to="/login">
            <ConnexionButton />
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default NavBar;
