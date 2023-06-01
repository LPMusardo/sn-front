import {
  Box,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { useState } from "react";
import { BiStar } from "react-icons/bi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdEvent, MdOutlineThumbUpAlt } from "react-icons/md";
import { RiStarSmileLine } from "react-icons/ri";
import { Route, Routes, useParams } from "react-router-dom";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";
import Menu from "./Menu/Menu";
import MyParticipationsContextProvider from "./MyApplicationsContextProvider";
import MyEventsContextProvider from "./MyEventsContextProvider";
import MyInformationsContextProvider from "./MyInformationsContextProvider";
import MyApplicationsContextProvider from "./MyParticipationsContextProvider";
import MyReceivedNotesContextProvider from "./MyReceivedNotesContextProvider";
import PanelContainer from "./PanelContainer";
import PanelApplications from "./Panels/PanelApplications/PanelApplications";
import NewEventBtn from "./Panels/PanelEvents/NewEventBtn";
import PanelEvents from "./Panels/PanelEvents/PanelEvents";
import PanelGivenNotes from "./Panels/PanelGivenNotes";
import PanelInformations from "./Panels/PanelInformations";
import PanelParticipations from "./Panels/PanelParticipations/PanelParticipations";
import PanelReceivedNotes from "./Panels/PanelReceivedNotes";


// interface Props {
//   idSection:number
// }

const PrivateUserPage = () => {
  const sections = [
    {
      id: 1,
      h: "My informations",
      t: "See and modify your informations here",
      icon: ImProfile,
      panel: PanelInformations,
    },
    {
      id: 2,
      h: "My Events",
      t: "Your organized events here",
      icon: MdEvent,
      panel: PanelEvents,
      extra: NewEventBtn,
    },
    {
      id: 3,
      h: "My Applications",
      t: "Your event applications here",
      icon: MdOutlineThumbUpAlt,
      panel: PanelApplications,
    },
    {
      id: 4,
      h: "My participations",
      t: "Your event participations here",
      icon: FaRegCalendarCheck,
      panel: PanelParticipations,
    },
    {
      id: 5,
      h: "My received Notes",
      t: "Notes received as organizer and participant",
      icon: BiStar,
      panel: PanelReceivedNotes,
    },
    {
      id: 6,
      h: "My given Notes",
      t: "Notes given as organizer and participant",
      icon: RiStarSmileLine,
      panel: PanelGivenNotes,
    },
  ];

  // function initSectionId() {
  //   const { sectionId: paramSectionId } = useParams();
  //   const defaultSectionId = sections[0].id;
  //   if (paramSectionId == undefined) return defaultSectionId;
  //   const paramSectionIdNumber = Number.parseInt(paramSectionId);
  //   const paramIndex = sections.findIndex(
  //     (section) => section.id === paramSectionIdNumber
  //   );
  //   if (paramIndex < 0) return defaultSectionId;
  //   return paramSectionIdNumber;
  // }

  const [selectedId, setSelectedId] = useState(1);

  // const currentSection =
  //   sections[sections.findIndex((section) => section.id === selectedId)]; // Ici la structure liste n'est pas vraiment adaptée O(n), mais c'est simple à manipuler et il y aura tjrs très peu d'éléments

  const { sectionId: paramSectionId } = useParams();


  return (
    <>
      <MyEventsContextProvider>
        <MyParticipationsContextProvider>
          <MyApplicationsContextProvider>
            <MyReceivedNotesContextProvider>
              <MyInformationsContextProvider>
                <>
                  <NavBar />
                  <div>{paramSectionId}</div>
                  <Box margin={5} minH="60vh">
                    <Grid
                      templateColumns={{ sm: "1fr", md: "350px 1fr" }}
                      gap={10}
                      my="35"
                    >
                      <GridItem>
                        <Menu
                          sections={sections}
                          selectedId={selectedId}
                          setSelectedId={setSelectedId}
                        />
                      </GridItem>
                      <GridItem overflow="auto">
                        <Routes>
                          {/* <Route index element={}/> */}
                          {sections.map((section) => (
                            <Route key={section.id}
                              path={section.id.toString()}
                              element={
                                <PanelContainer
                                  setSection={() => setSelectedId(section.id)}
                                  heading={section.h}
                                  extra={section.extra && <section.extra />}
                                >
                                  <section.panel />
                                </PanelContainer>
                              }
                            />
                          ))}
                          {/* <Route path="*" Component={MainPage} /> */}
                        </Routes>
                        {/* <PanelContainer
                        heading={currentSection.h}
                        extra={currentSection.extra && <currentSection.extra />}
                      >
                      <currentSection.panel prop="MA PROP" />
                      </PanelContainer> */}
                      </GridItem>
                    </Grid>
                  </Box>
                  <Box marginTop={100}>
                    <Footer />
                  </Box>
                </>
              </MyInformationsContextProvider>
            </MyReceivedNotesContextProvider>
          </MyApplicationsContextProvider>
        </MyParticipationsContextProvider>
      </MyEventsContextProvider>
    </>

  );
};

export default PrivateUserPage;
