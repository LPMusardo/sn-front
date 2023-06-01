import { Box, Heading, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  comment: string;
}

const Comment = ({ title, comment }: Props) => {
  return (
    <Box w="40" whiteSpace="normal">
      <Heading size="sm">{title}</Heading>
      <Text pt={1}>{comment}</Text>
    </Box>
  );
};

export default Comment;
