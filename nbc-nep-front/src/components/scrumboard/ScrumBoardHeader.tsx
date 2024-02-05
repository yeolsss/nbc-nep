import { StLine } from "@/components/spaces/SpaceListHeader";
import SpaceSearchForm from "@/components/spaces/SpaceSearchForm";
import {
  StHeaderWrapper,
  StSortTitleContainer,
} from "./styles/scrumBoardHeader.styles";

export default function ScrumBoardHeader() {
  return (
    <StHeaderWrapper>
      <StSortTitleContainer>
        <span>최근 순</span>
        <StLine />
        <span>이름 순</span>
      </StSortTitleContainer>
      <SpaceSearchForm />
    </StHeaderWrapper>
  );
}
