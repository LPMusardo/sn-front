import { Image, Card } from "@chakra-ui/react";

interface IEventImageProps {
  image_url: string;
}


const EventImagePanel = (event: IEventImageProps) => {
  return (
    <>
      <Card variant="outline" overflow={"hidden"} padding={"10px"} boxSize={{ sm: "lg", lg: "lg" }}>
        <Image
          src={event.image_url}
          fallbackSrc="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
          boxSize="100%"
          objectFit="contain"
        />
      </Card>
    </>
  );
};

export default EventImagePanel;
