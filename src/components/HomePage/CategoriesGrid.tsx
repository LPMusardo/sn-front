import {  SimpleGrid, useToast } from "@chakra-ui/react";

import CategoryCard from "./CategoryCard";
import React, { useState, useEffect } from "react";
import { useAxiosFetch } from "../../services/useAxiosFetch";
import { ICategoryData } from "../../models/ICategoryData";




const imagesUrl : {[key: string]: string} = {
  Sports:"https://img.freepik.com/premium-vector/basketball_319667-191.jpg?size=400",
  "Video games":"https://www.toureiffel.paris/sites/default/files/actualite/image_principale/vue_depuisjardins_webbanner_3.jpg?size=400",
  Sciences:"https://assets.afcdn.com/recipe/20180406/78384_w1024h1024c1cx2808cy1872.webp?size=400",
  Food:"https://domf5oio6qrcr.cloudfront.net/medialibrary/3440/conversions/w0714a16207251033667-thumb.jpg",
  "Art & Culture":"https://assets.ltkcontent.com/images/7206/examples-of-culture_7abbbb2796.jpg",
  Music:"https://www.shutterstock.com/image-vector/music-notes-curves-swirls-vector-260nw-1705493965.jpg",
  Cinema:"https://img.freepik.com/free-vector/cinema-label-poster_603843-2892.jpg",
  "Good causes":"https://res.cloudinary.com/ybmedia/image/upload/c_crop,h_1000,w_1778,x_111,y_0/c_fill,f_auto,h_1215,q_auto,w_2160/v1/m/3/c/3c0eb4b230629c25a76071d28dc9008e0f226ebb/20-facts-might-know-batman.jpg",
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
