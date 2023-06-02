import { SimpleGrid, useToast } from "@chakra-ui/react";

import CategoryCard from "./CategoryCard";
import React, { useState, useEffect } from "react";
import { useAxiosFetch } from "../../services/useAxiosFetch";
import { ICategoryData } from "../../models/ICategoryData";




const imagesUrl: { [key: string]: string } = {
  Sports: "https://cdn-icons-png.flaticon.com/512/7858/7858578.png",
  "Video games": "https://cdn-icons-png.flaticon.com/512/2329/2329358.png",
  Sciences: "https://cdn-icons-png.flaticon.com/512/1602/1602737.png",
  Food: "https://cdn-icons-png.flaticon.com/512/776/776443.png",
  "Art & Culture": "https://cdn-icons-png.flaticon.com/512/1497/1497726.png",
  Music: "https://cdn-icons-png.flaticon.com/512/4097/4097726.png",
  Cinema: "https://cdn-icons-png.flaticon.com/512/2809/2809590.png",
  "Good causes": "https://cdn-icons-png.flaticon.com/512/5188/5188872.png",
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

  //----------------------------- Error Toast -----------------------------
  const toast = useToast()
  useEffect(() => {
    if (error) {
      toast.closeAll();
      toast({
        title: 'Error Encountered',
        description: error,
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  }, [error])

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing="70px"
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
