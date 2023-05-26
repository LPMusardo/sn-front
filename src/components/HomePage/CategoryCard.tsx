import { Link as ReachLink } from "react-router-dom";

import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Center,
  Link,
} from "@chakra-ui/react";

interface CategoryCardProps {
  name: string;
  imageurl: string;
  id: string;
}

{
}

const CategoryCard = ({ name, id, imageurl }: CategoryCardProps) => {
  return (
    <Link as={ReachLink} to={`/search?MainCategoryId=${id}`}>
      <Card size={"sm"}>
        <CardBody>
          <Center>
            <Image
              src={imageurl}
              fallbackSrc="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
              borderRadius="lg"
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
