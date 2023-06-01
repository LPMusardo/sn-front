import { HStack, Text } from "@chakra-ui/react"
import { RiGroupLine } from "react-icons/ri"
import useFilling, { EventFilling } from "../../Hooks/useFilling"
import { CandidateEvent } from "../PrivateUserPage/MyApplicationsContextProvider"

interface Props {
    event: CandidateEvent
}

const Filling = ({ event }: Props) => {

    const [eventFilling] = useFilling(event.id)

    return (
        <HStack>
            <RiGroupLine />
            <Text>{`${eventFilling.nb_participants} / ${event.participants_number}`}</Text>
        </HStack>
    )
}

export default Filling