import { IconButtonProperty } from "@/types/metaverse.types";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import { useEffect, useState } from "react";
import Image from "next/image";
import { StBadge } from "@/components/common/badge/badge.styles";
import styled from "styled-components";

const StButton = styled.button<{ $isClose: boolean }>`
  background-color: unset;
  border: unset;
  padding: unset;
  cursor: pointer;
  position: relative;
  color: white;

  & > span {
    display: inline-block;
    overflow: hidden;
    height: ${(props) => (props.$isClose ? "100%" : "0")};
    margin-top: 3px;
    white-space: ${(props) => (props.$isClose ? "pre-line" : "nowrap")};
    line-height: 1.5rem;
    transition: 0.5s ease-in-out height;
  }

  &:hover {
    & > span {
      height: fit-content;
    }
    background-color: unset;
  }
`;

export default function IconButton({
  buttonImage,
  description,
  type,
  handleOnClick,
}: IconButtonProperty) {
  const { dmChatStates, globalChatState } = useChatAlarm();
  const [alarmState, setAlarmState] = useState<boolean>(
    globalChatState ||
      (dmChatStates ? dmChatStates.some((dm) => dm.state) : false)
  );

  useEffect(() => {
    setAlarmState(
      globalChatState ||
        (dmChatStates ? dmChatStates.some((dm) => dm.state) : false)
    );
  }, [dmChatStates, globalChatState]);

  return (
    <StButton onClick={handleOnClick} $isClose={type === "close"}>
      <Image src={buttonImage} alt={description} width="32" height="32" />
      {alarmState && type === "chat" && (
        <StBadge color="var(--state-online)" x={30} y={30} />
      )}
      <span>{description}</span>
    </StButton>
  );
}
