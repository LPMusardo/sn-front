import { Link as ReachLink } from "react-router-dom";

import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Center,
  Link,
  Square,
  Box,
} from "@chakra-ui/react";

interface CategoryCardProps {
  name: string;
  imageurl: string;
  id: string;
}

const divStyle = {
  width: "100%",
  "padding-bottom": "100%",
  "background-color": "red",

}

const CategoryCard = ({ name, id, imageurl }: CategoryCardProps) => {
  return (
    <Link as={ReachLink} to={`/search?MainCategoryId=${id}`}>
      <Card size={"sm"}>
        <CardBody>
          <Center className="square">
              <Image className="image"
                src={imageurl}
                borderRadius="lg"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/150"
                // fallbackSrc="https://cdn.cdkeys.com/700x700/media/catalog/product/b/a/babylons-fall-pc-game-steam-cover_2_.jpg"
              />
          </Center>
          <Stack mt="6" spacing="3">
            <Heading size="md">{name}</Heading>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CategoryCard;
