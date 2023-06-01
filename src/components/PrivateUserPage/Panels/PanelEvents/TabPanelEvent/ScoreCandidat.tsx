import { BsDash } from "react-icons/bs";
import useScores from "../../../../../Hooks/useScores";
import Rating from "../../../../shared/Rating";
import { Text } from "@chakra-ui/react";


interface Props {
    userId: number;
}

const ScoreCandidat = ({ userId }: Props) => {

    const [userScores] = useScores(userId);

    return (
        <>
            {userScores.avg_score_participant ? <Rating score={userScores.avg_score_participant} total={5} spacing={0.5} /> : <BsDash/>}
        </>
    )
}

export default ScoreCandidat