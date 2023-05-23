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
              fallbackSrc="https://img.freepik.com/premium-vector/basketball_319667-191.jpg"
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
