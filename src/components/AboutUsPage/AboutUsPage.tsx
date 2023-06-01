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

export const AboutUsPage = () => {
  return (
    <>
      <NavBar />
      <Box minH="71vh">
        <Container maxW="container.lg" mt={10}>
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            About Us!
          </Heading>


          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>Maxime Guiliani</AccordionButton>
              </h2>
              <AccordionPanel>
                Hello, I'm Maxime Guiliani, I'm 22 years old and I'm a student
                at the University of Luminy. I'm would like to be a full stack
                developer and I'm passionate about web development. I'm also
                passionate about video games and I like to play them in my free
                time.
                <br />
                <br />
                For this project i work on the back-end part, I created the API.
                I also worked on the front-end part, I created the event page
                and the user page and I also worked on the home page.
              </AccordionPanel>
            
            </AccordionItem>
            
            <AccordionItem>
              <h2>
                <AccordionButton>Léo-Paul Musardo</AccordionButton>
              </h2>
              <AccordionPanel>
                Hello, my name is Léo-Paul and I'm a 22-year-old student at the University of Luminy.
                <br />
                <br />
                In this project, I am primarily responsible for the database and front-end development. Specifically, I designed the code structure of the website and selected the appropriate technologies to build it.
                <br />
                Additionally, I created the database and developed methods to query it.
                <br />
                Lastly, I am responsible for deploying both the website and API onto a server.
              </AccordionPanel>
            </AccordionItem>
            
            <AccordionItem>
              <h2>
                <AccordionButton>Yacine Boukhari</AccordionButton>
              </h2>
              <AccordionPanel>
                Description of person 1 and what they did for the project.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>Mickaël Lascoutounas</AccordionButton>
              </h2>
              <AccordionPanel>
                Description of person 2 and what they did for the project.
              </AccordionPanel>
            </AccordionItem>

          </Accordion>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
