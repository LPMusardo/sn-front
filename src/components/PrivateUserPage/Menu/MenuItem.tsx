import { Button } from "@chakra-ui/react";
import { MouseEvent, ReactElement } from "react";

interface Props {
  children: ReactElement;
  isActive: boolean;
  onSelect: (e: MouseEvent) => void;
  onClick: (e: MouseEvent) => void;
}

const MenuItem = ({ isActive, children, onSelect, onClick }: Props) => {
  return (
    <Button
      colorScheme="gray"
      variant="ghost"
      isActive={isActive}
      onClick={(e) => {
        onSelect(e), onClick(e);
      }}
      py="8"
      px="5"
    >
      {children}
    </Button>
  );
};

export default MenuItem;
