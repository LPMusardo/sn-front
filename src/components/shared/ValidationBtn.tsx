import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { ReactElement, useRef, useState } from "react";
import ToastBtn from "./ToastBtn";

type ToastType = {
  title: string;
  description: string;
  status: "success" | "error"| "warning";
  duration: number;
  isClosable: boolean;
};

interface Props {
  colorScheme: string;
  children: ReactElement;
  modalBtnValidateTxt: string;
  modalBtnCancelTxt: string;
  modalHeader: string;
  modalTxt: string;
  onValidate: () => Promise<any>;
  onFinal: () => Promise<any>;
  disabled?: boolean;
  successToast: ToastType;
  failToast: ToastType;
}

const ValidationBtn = ({
  onFinal,
  colorScheme,
  children,
  modalBtnValidateTxt,
  modalBtnCancelTxt,
  modalHeader,
  modalTxt,
  onValidate,
  disabled,
  successToast,
  failToast,
}: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = useRef(null);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button isDisabled={disabled || isLoading } colorScheme={colorScheme} onClick={onOpen}>
        {children}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <div>{modalHeader}</div>
              {isLoading && <Spinner/>}
            </AlertDialogHeader>

            <AlertDialogBody>{modalTxt}</AlertDialogBody>

            <AlertDialogFooter>
              <HStack>
                <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
                  {modalBtnCancelTxt}
                </Button>

                <ToastBtn
                  colorScheme={colorScheme}
                  onClick={onValidate}
                  successToast={successToast}
                  failToast={failToast}
                  preJob={()=>{setIsLoading(true)}}
                  postJob={()=>{setIsLoading(false)}}
                  final={() => {setOpen(false); onFinal()}}
                  isDisabled={isLoading}
                >
                  <div>{modalBtnValidateTxt}</div>
                </ToastBtn>
              </HStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ValidationBtn;

// const onValidate = async () => {
//   /*throw new Error()*/
// };

// successToast={{
//   title: "string",
//   description: "string",
//   status: "success",
//   duration: 4000,
//   isClosable: true,
// }}
// failToast={{
//   title: "string",
//   description: "string",
//   status: "error",
//   duration: 4000,
//   isClosable: true,
// }}
