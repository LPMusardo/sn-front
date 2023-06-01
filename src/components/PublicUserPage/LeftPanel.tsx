import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Flex,
  Avatar,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { IUserData } from "../../models/IUserData";


interface ILeftPanelProps {
  user: IUserData;
}

const LeftPanel: React.FC<ILeftPanelProps> = ({ user }) => {
  return (
    <Tabs>
      <TabList>
        <Tab>About</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <VStack spacing={10} align="flex-start">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={user.username} src={user?.picture ?? ""} />
              <Box>
                <Heading size="sm">{user.username}</Heading>
                <Text>Since : {new Date(user.creation_date).toLocaleDateString()}</Text>
              </Box>
            </Flex>
            <Box>
              <Heading size="sm" mb="2">
                Description
              </Heading>
              <Text>
                {user?.bio ?? ""}
              </Text>
            </Box>
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LeftPanel;
