import styled from "styled-components";

export const StModalHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${(props) => props.theme.spacing[24]};
  h2 {
    font-family: var(--point-font);
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
    font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
  }
  button {
    width: ${(props) => props.theme.unit[20]};
    height: ${(props) => props.theme.unit[20]};
    border: none;
    padding: 0;
    background: url("/assets/close.svg") no-repeat center;
    &:hover {
      background-color: transparent;
    }
  }
`;
