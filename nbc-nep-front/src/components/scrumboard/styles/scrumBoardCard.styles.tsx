import { StButtonContainer } from "@/components/spaces/SpaceListHeader";
import styled from "styled-components";

export const StCardWrapper = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
  gap: ${(props) => props.theme.spacing[16]};
  padding: ${(props) => props.theme.spacing[16]};
`;

export const StContentsContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: var(--sub-font);
  gap: ${(props) => props.theme.spacing[8]};
  margin-top: ${(props) => props.theme.spacing[12]};
  margin-bottom: ${(props) => props.theme.spacing[12]};
  padding: 0 ${(props) => props.theme.spacing[12]};
  h1 {
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.sm.fontWeight};
  }
  p {
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  }
`;

export const StScrumBoardOpenButtonContainer = styled(StButtonContainer)`
  padding: 0;
  font-size: 1.5rem;
`;
