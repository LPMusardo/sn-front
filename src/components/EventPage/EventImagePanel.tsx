import { Image, Card, Box } from "@chakra-ui/react";

const EventImagePanel = () => {
  return (
    <>
      <Card variant="outline" overflow={"hidden"} padding={"10px"} boxSize={{sm:"lg", lg:"lg"}}>
        <Image
          src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg"
          fallbackSrc="https://via.placeholder.com/150"
          boxSize="100%"
          objectFit="contain"
        />
      </Card>
    </>
  );
};

export default EventImagePanel;
