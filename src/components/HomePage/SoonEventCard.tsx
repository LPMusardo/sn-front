import { Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, ButtonGroup, Button,Link} from '@chakra-ui/react'
import { Link as ReachLink } from "react-router-dom";





interface SoonEventCardProps {
    id: string;
    name: string;
    category: string;
    description: string;
    image_url: string;
    participants_number: string;
    date: string;
  }

const SoonEventCard = ({ id, name, category, description, image_url,participants_number,date  }: SoonEventCardProps) => {
    return (
        
        <Card size={"md"}>
            <CardBody>
            <Link as={ReachLink} to={`/events/${id}`}>
                <Image
                    src={image_url}
                    alt='Green double couch with wooden legs'
                    fallbackSrc="https://img.freepik.com/premium-vector/basketball_319667-191.jpg"
                    borderRadius='lg' />
            </Link>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{name}</Heading>
                    <Text>
                        {description}
                    </Text>
                    <Text color='purple.100' fontSize='m'>
                        participants_number: {participants_number}
                    </Text>
                    <Text color='purple.300'  fontSize='s'>
                        {new Date(date).toDateString()}
                    </Text>
                    
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='purple'>
                        Apply
                    </Button>
                    <Link as={ReachLink} to={`/events/${id}`}>

                    <Button variant='ghost' colorScheme='purple'>
                        More details
                    </Button>
                    </Link>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default SoonEventCard