import { Button, ThemeTypings, useToast } from "@chakra-ui/react";
import { ReactElement } from "react";

interface ToastData {
  title: string,
  description: string,
  status: 'success' | 'error' | 'warning' | 'info',
  duration: number,
  isClosable: boolean,
}

interface Props {
  isDisabled: boolean
  onClick: () => Promise<void>,
  successToast: ToastData,
  failToast: ToastData,
  final: () => void,
  children: ReactElement,
  colorScheme?: ThemeTypings["colorSchemes"],
  preJob: () => void
  postJob: () => void
}

const ToastBtn = ({ children, colorScheme, onClick, successToast, failToast, final, preJob, postJob, isDisabled }: Props) => {
  const toast = useToast();
  return (
    <Button
      isDisabled={isDisabled}
      colorScheme={colorScheme}
      onClick={() => {
        preJob() /*()=>{disable cancel et validate}*/ /*()=>{setisLoading de Modal à true}*/
        onClick() //Job lonnnnng
          .then(() => { toast(successToast); postJob(); }) /* puis setisLoading de Modal à false*/
          .catch(() => { toast(failToast); postJob() }) /* puis setisLoading de Modal à false*/
          .finally(() => final());
      }}
    >
      {children}
    </Button>
  );
};

export default ToastBtn;
