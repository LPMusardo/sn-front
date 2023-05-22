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

const LeftPanel = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>About</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <VStack spacing={10} align="flex-start">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Charles" src="https://bit.ly/sage-adebayo" />
              <Box>
                <Heading size="sm">Charles</Heading>
                <Text>Since : 01/01/22</Text>
              </Box>
            </Flex>
            <Box>
              <Heading size="sm" mb="2">
                Description
              </Heading>
              <Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Asperiores quae laudantium illo expedita temporibus inventore
                iure provident sunt voluptas fugiat
              </Text>
            </Box>
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LeftPanel;
