import { Menu, MenuButton, Button, MenuList, MenuGroup, MenuItem, MenuDivider } from "@chakra-ui/react";

const ProfileButton = () => {
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="purple">
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments </MenuItem>
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
