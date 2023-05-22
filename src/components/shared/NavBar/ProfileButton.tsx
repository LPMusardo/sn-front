import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { accountService } from "../../../services/account.service";


const ProfileButton = () => {

  const navigate = useNavigate();

  const logout = () => {
    accountService.logout()
    navigate("/")
  }
  
  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="purple"
        leftIcon={<FaRegUserCircle />}
        variant="outline"
        size="sm"
      >
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem onClick={()=>navigate('/profile/1')} >My informations</MenuItem>
          <MenuItem onClick={()=>navigate('/profile/2')} >My events</MenuItem>
          <MenuItem onClick={()=>navigate('/profile/3')} >More...</MenuItem>
          <MenuItem onClick={logout}> Déconnexion</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default ProfileButton;
