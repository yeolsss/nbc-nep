import IconButtonByPlayerList from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButtonByPlayerList";
import IconButtonWrapper from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButtonWrapper";
import useGNBIconButtons from "@/hooks/GNB/useGNBIconButtons";
import styled from "styled-components";

export default function GlobalNavBarIconWrapper() {
  const buttons = useGNBIconButtons();
  return (
    <StBottomIconWrapper>
      {buttons.map((button, index) => {
        if (button.type !== "playerList") {
          return (
            <IconButtonWrapper
              key={button.description + index}
              button={button}
            />
          );
        } else {
          return (
            <IconButtonByPlayerList
              key={button.description + index}
              button={button}
            />
          );
        }
      })}
    </StBottomIconWrapper>
  );
}
const StBottomIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 287px;
  width: 44px;
  margin-bottom: ${({ theme }) => theme.spacing["24"]};
`;
