import { HStack } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Props {
  score: number;
  total: number;
  color?: string;
  size?: number;
  spacing?: number;
}

const Rating = ({ score, total, color, size, spacing }: Props) => {
  const filled = Math.round(score);
  const empty = Math.round(total) - filled;
  const starProps = { color, size };

  function starList() {
    const components: JSX.Element[] = [];
    if(score ==-1) {
      components.push(<p>No notes yet!</p>);

      return components;
    }
    

    for (let i = 0; i < filled; i++)
      components.push(<AiFillStar key={`fill_${i}`} {...starProps} />);
    for (let i = 0; i < empty; i++)
      components.push(<AiOutlineStar key={`empty_${i}`} {...starProps} />);
    return components;
  }

  return <HStack spacing={spacing}>{starList()}</HStack>;
};

export default Rating;
