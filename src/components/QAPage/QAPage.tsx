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
                We are a group of 4 students reunited to create this project for
                a school assignment.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Heading as="h2" size="lg">
                  What is this site?
                </Heading>
              </AccordionButton>
              <AccordionPanel>
                This site is a platform for people to search, create, apply and
                participate in events.
                <br />
                The goal of this project was to create an API and a front-end
                application that would allow users to create and participate in
                events with a notation system.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Heading as="h2" size="lg">
                  How to use?
                </Heading>
              </AccordionButton>
              <AccordionPanel>
                You can use this site by creating an account and then you can
                create events, apply to events and participate in events.
                <br />
                You can also search for events by name, location, date, category
                and more.
                <br />
                You can chat with other users in the chat section of an event.
                <br />
                You can also rate events and users.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Heading as="h2" size="lg">
                  How to contact us?
                </Heading>
              </AccordionButton>
              <AccordionPanel>
                You can contact us by sending an email to one of the following
                addresses:
                <br />
                <br />
                <b>
                  <a href="mailto:leo-paul.musardo@etu.univ-amu.fr">
                    leo-paul.musardo@etu.univ-amu.fr
                  </a>
                </b>
                <br />
                <br />
                <b>
                  <a href="mailto:maxime.guiliani@etu.univ-amu.fr">
                    maxime.guiliani@etu.univ-amu.fr
                  </a>
                </b>
                <br />
                <br />
                <b>
                  <a href="mailto:mickael.lascoutounas@etu.univ-amu.fr">
                    mickael.lascoutounas@etu.univ-amu.fr
                  </a>
                </b>
                <br />
                <br />
                <b>
                  <a href="mailto:yacine.boukhari@etu.univ-amu.fr">
                    yacine.boukhari@etu.univ-amu.fr
                  </a>
                </b>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
