import useScrumBoardMemberSearch from "@/zustand/scrumBoardMemberStore";
import styled from "styled-components";
import closeIcon from "@/assets/boards/assingee-delete.svg";
import Image from "next/image";

export default function SelectAssigneesList() {
  const { assignees, deleteAssignees } = useScrumBoardMemberSearch();

  const handleDeleteAssignees = (id: string) => {
    deleteAssignees(id);
  };
  return (
    <StSelectAssigneesListWrapper>
      {assignees.map((assignee) => (
        <StSelectAssigneesCard key={assignee.id}>
          <span>{assignee.space_display_name}</span>
          <StDeleteButton
            onClick={() => handleDeleteAssignees(assignee.users?.id!)}
          >
            <Image src={closeIcon} alt={"삭제"} width={12} height={12} />
          </StDeleteButton>
        </StSelectAssigneesCard>
      ))}
    </StSelectAssigneesListWrapper>
  );
}

const StSelectAssigneesListWrapper = styled.div`
  width: 100%;
  border: 1px solid;
  border-radius: ${(props) => props.theme.border.radius[8]};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  padding: ${(props) => props.theme.spacing[8]};
  display: flex;
  gap: ${(props) => props.theme.spacing[8]};
  flex-wrap: wrap;
`;

const StSelectAssigneesCard = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spacing[4]}
    ${(props) => props.theme.spacing[8]};
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing[4]};
  border-radius: ${(props) => props.theme.border.radius["circle"]};
  background: rgba(239, 246, 255, 0.8);

  > span {
    color: ${(props) => props.theme.color.blue["600"]};
    text-overflow: ellipsis;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.unit[14]}px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.28px;
    text-transform: uppercase;
  }
`;

const StDeleteButton = styled.button`
  border: none;
  width: 12px;
  background-color: unset;
  height: 12px;
  padding: unset;
  &:hover {
    background-color: unset;
  }
`;