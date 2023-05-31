import {
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Container,
  Box,
} from "@chakra-ui/react";
import NavBar from "../shared/NavBar/NavBar";
import Footer from "../shared/Footer";

export const QAPage = () => {
  return (
    <>
      <NavBar />
      <Box minH="71vh">
        <Container maxW="container.lg" mt={10}>
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            Questions & Answers!
          </Heading>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Heading as="h2" size="lg">
                  Who are we?
                </Heading>
              </AccordionButton>
              <AccordionPanel>
                We are a team of developers who love building awesome things!
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Heading as="h2" size="lg">
                  What is this site?
                </Heading>
              </AccordionButton>
              <AccordionPanel>
                This site is a platform for sharing knowledge and connecting
                with other developers.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Heading as="h2" size="lg">
                  What is the purpose of this site?
                </Heading>
              </AccordionButton>
              <AccordionPanel>
                The purpose of this site is to provide a space for developers to
                learn, collaborate, and share their knowledge with others.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Heading as="h2" size="lg">
                  How to use?
                </Heading>
              </AccordionButton>
              <AccordionPanel>
                To use this site, simply create an account and start exploring
                the resources and community features!
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Heading as="h2" size="lg">
                  How to contact us?
                </Heading>
              </AccordionButton>
              <AccordionPanel>
                You can contact us by sending an email to support@example.com.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
