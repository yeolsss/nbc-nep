import { useDeleteCategory } from "@/hooks/query/useSupabase";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CategoryDropdownMenu from "./CategoryDropdownMenu";
import EditCategoryForm from "./EditCategoryForm";

interface Props {
  name: string;
  color: string;
  itemCount: number;
  id: string;
}

export default function CategoryHeader({ name, color, id, itemCount }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { space_id } = useParams();
  const spaceId = space_id as string;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { remove } = useDeleteCategory(spaceId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteCategory = () => {
    remove(id);
  };

  return (
    <StCategoryHeader>
      {isEdit ? (
        <EditCategoryForm
          name={name}
          color={color}
          id={id}
          setIsEdit={setIsEdit}
        />
      ) : (
        <>
          <StCategoryInfo>
            <StCategoryColor $color={color}>color</StCategoryColor>
            <h1>{name}</h1>
          </StCategoryInfo>
          <StItemCounter>{itemCount}items</StItemCounter>
          <StDropDownMenuBtnWrapper ref={dropdownRef}>
            <button onClick={handleDropdown}>open dropdown</button>
            {isDropdownOpen && (
              <CategoryDropdownMenu
                setIsEdit={setIsEdit}
                setIsDropdownOpen={setIsDropdownOpen}
                handleDeleteCategory={handleDeleteCategory}
              />
            )}
          </StDropDownMenuBtnWrapper>
        </>
      )}
    </StCategoryHeader>
  );
}

const StCategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[20]};
`;

const StCategoryInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[8]};
  & > h1 {
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.md.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
  }
`;

const StItemCounter = styled.p`
  align-self: end;
  padding-right: ${(props) => props.theme.spacing[24]};
  opacity: 0.3;
  margin-bottom: -${(props) => props.theme.unit[2]}px;
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
  font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
  font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
`;

const StCategoryColor = styled.span<{ $color: string }>`
  display: block;
  width: ${(props) => props.theme.unit[12]}px;
  height: ${(props) => props.theme.unit[12]}px;
  margin-top: -${(props) => props.theme.unit[2]}px;
  border-radius: ${(props) => props.theme.border.radius.circle};
  font-size: 0;
  background-color: ${(props) => props.$color};
`;

const StDropDownMenuBtnWrapper = styled.div`
  position: relative;
  & > button {
    position: relative;
    display: block;
    opacity: 0.2;
    background-color: transparent;
    background-image: url("/assets/dropdown.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: ${(props) => props.theme.unit[20]}px;
    height: ${(props) => props.theme.unit[20]}px;
    padding: 0;
    border: none;
    font-size: 0;
    &:hover {
      opacity: 1;
      background-color: inherit;
    }
  }
`;