import { ReactNode } from "react";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaGithub } from "react-icons/fa";
import { Link as ReachLink } from "react-router-dom"


// import AppStoreBadge from '@/components/AppStoreBadge';
// import PlayStoreBadge from '@/components/PlayStoreBadge';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      width="100%"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"/aboutus"}>About Us</Link>
            <Link href={"https://docs.google.com/document/d/1lMD70BPlE9A0n-wD7AetGgY5mdbdFvU33dJWCmLkIvU"}>Sprints</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"Q&A"}>Q&A</Link>
            <Link href={"https://app.swaggerhub.com/apis-docs/MAXIMEGUILIANI_2/Social_network_API/1.0.0"}>Documentation API</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Link href={"#"}>Cookies Policy</Link>
            <Link href={"#"}>Privacy Policy</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Install App</ListHeader>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2023 SN corporation. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
          <Stack direction={"column"} >
            <SocialButton
              label={"Front"}
              href={"https://github.com/LPMusardo/sn-front"}
              >
              <FaGithub />
            </SocialButton>
            <Link as={ReachLink} to="https://github.com/LPMusardo/sn-front" >
                Front
              </Link>                </Stack>
            <Stack direction={"column"}>
              <SocialButton
                label={"Back"}
                href={"https://github.com/MaximeGuiliani/Social-network"}
              >
                <FaGithub />
              </SocialButton>
              <Link as={ReachLink} to="https://github.com/MaximeGuiliani/Social-network" >
                Back
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
