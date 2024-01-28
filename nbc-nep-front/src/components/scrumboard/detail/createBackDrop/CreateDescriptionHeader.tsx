import styled from "styled-components";
import { SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH } from "@/components/scrumboard/constants/constants";
import CreateBackDropTitle from "@/components/scrumboard/detail/createBackDrop/CreateBackDropTitle";

interface Props {
  text?: string;
  countType: "C" | "R";
}
export default function CreateDescriptionHeader({ text, countType }: Props) {
  return (
    <StCreateBackDropDescriptionHeader>
      <CreateBackDropTitle title={"보드 설명"} />
      <span>
        {countType === "C" &&
          `${text?.length}/${SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH}`}
      </span>
    </StCreateBackDropDescriptionHeader>
  );
}

const StCreateBackDropDescriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    color: #5E6066;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.unit[12]}px}
    font-weight: 400;
    line-height: 100%; 
  }
`;