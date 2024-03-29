import { useState } from "react";
import { CallBackProps, STATUS } from "react-joyride";

export default function useTourTooltip<T>(stepArray: T[]) {
  const [run, setRun] = useState<boolean>(false);
  const [steps] = useState<T[]>(stepArray);
  const [showTemporaryComponent, setShowTemporaryComponent] =
    useState<boolean>(false);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action } = data;

    if (action === "start") {
      setShowTemporaryComponent(true);
    }
    // 종료 시
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setShowTemporaryComponent(false);
      setRun(false);
    }
  };

  const setRunState = (isRun: boolean) => {
    setRun(isRun);
  };
  return {
    run,
    setRunState,
    steps,
    handleJoyrideCallback,
    showTemporaryComponent,
  };
}
