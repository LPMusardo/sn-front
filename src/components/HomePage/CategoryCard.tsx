import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  ButtonGroup,
  Button,
  Center,
} from "@chakra-ui/react";

const CategoryCard = () => {
  return (
    <Card size={"sm"}>
      <CardBody>
        <Center>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
            borderRadius="lg"
          />
        </Center>
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
