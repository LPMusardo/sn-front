import {  SimpleGrid } from "@chakra-ui/react";

import CategoryCard from "./CategoryCard";
import React, { useState, useEffect } from "react";
import { useAxiosFetch } from "../../services/useAxiosFetch";
import { ICategoryData } from "../../models/ICategoryData";




const imagesUrl : {[key: string]: string} = {
  Sport:"https://img.freepik.com/premium-vector/basketball_319667-191.jpg?size=400",
  Culture:"https://www.toureiffel.paris/sites/default/files/actualite/image_principale/vue_depuisjardins_webbanner_3.jpg?size=400",
  Food:"https://assets.afcdn.com/recipe/20180406/78384_w1024h1024c1cx2808cy1872.webp?size=400",

}




const CategoriesGrid: React.FC = () => {
  const [categories, setCategories] = useState<ICategoryData[]>([]);

  const [data, error, loading] = useAxiosFetch({
    method: "GET",
    url: "/categories",
  });

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      console.log(data.categories);
    } else {
      setCategories([]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("retrieving categories...");
    }
  }, [loading]);

  //const { data, error, isLoading } = useGames(gameQuery);
  //let data: any[] = [];
  // const skeletons = [1, 2, 3, 4, 5, 6];

  //if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={3}
    >
        {categories.map((category: ICategoryData) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            id={category.id}
            imageurl={imagesUrl[category.name]}
          />
        ))}

    </SimpleGrid>
  );
};
export default CategoriesGrid;
