import { SimpleGrid } from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";

const CategoriesGrid = () => {
  //const { data, error, isLoading } = useGames(gameQuery);
  let data: any[] = [];
  // const skeletons = [1, 2, 3, 4, 5, 6];

  //if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={3}
    >
      {/* {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))} */}
      {/* {data.map((game) => (
            <CategoryCard key={""} category={"category"} />
        ))} */}

      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </SimpleGrid>
  );
};
export default CategoriesGrid;
