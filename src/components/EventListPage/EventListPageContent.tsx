import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";
import FiltersToggle from "./FiltersToggle";
import ResultList from "./ResultList";
import SearchInput2 from "./SearchInput2";

// event_name: z.string(),
// description: z.string(),
// category: z.string(),
// date_min: z.coerce.date(), // max>min
// date_max: z.coerce.date(),
// main_category: z.enum(["1", "2", "3", ""]),
// participants_min: z.string().regex(/^[0-9]*$/), //max>min
// participants_max: z.string().regex(/^[0-9]*$/),
// street: z.string(),
// city: z.string(),
// country: z.string(),
// zip: z.string(),

const EventListPage = () => {



  useEffect(() => {
    // if (eventName == undefined) {
    //   setSearch("vide");
    //   return;
    // }
    // setSearch(eventName);
    console.log("coucou depuis ListPage");
  });

  return (
    <>
      <NavBar
        // onSearch={() => {}}
        searchInput={<SearchInput2 />}
      />

      {/* <div>{ search}</div> */}
      {/* <div>{ JSON.stringify(getQueryParams(), null, 2).toString()}</div> */}
      {/* <Button
        colorScheme="teal"
        onClick={() => navigate("/search?event_name=babar")}
      >
        Test
      </Button> */}

      <Box margin={5} minH="60vh">
        <FiltersToggle />
        <ResultList />
      </Box>

      <Box marginTop={100}>
        <Footer />
      </Box>
    </>
  );
};

export default EventListPage;
