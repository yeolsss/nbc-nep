import styled from "styled-components";

export const StModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
`;

export const StConfirmContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${(props) => props.theme.border.radius["8"]};

  display: flex;
  flex-direction: column;
  z-index: 2020;

  min-width: ${(props) => props.theme.unit["412"]};

  background: ${(props) => props.theme.color.base.white};
`;

export const StConfirmTitleArea = styled.div`
  position: relative;
  color: ${(props) => props.theme.color.base.white};
  & span {
    position: absolute;
    left: ${(props) => props.theme.spacing["12"]};
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--point-font);
    font-weight: bold;
    font-size: ${(props) => props.theme.unit["12"]};
  }
  & h2 {
    text-align: center;
    padding: ${(props) => `${props.theme.spacing["12"]} 0`};
    font-size: ${(props) => props.theme.unit["20"]};
    font-weight: bold;
    background: ${(props) => props.theme.color.bg.brand};
    border-radius: ${(props) =>
      `${props.theme.border.radius["8"]} ${props.theme.border.radius["8"]} 0 0`};
  }
`;

export const StConfirmMessageContainer = styled.div`
  padding: ${(props) =>
    `${props.theme.spacing["32"]} ${props.theme.spacing["16"]}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  font-size: ${(props) => props.theme.unit["16"]};
  p {
    font-family: var(--default-font);
    font-weight: normal;
  }
  & > img {
    margin: ${(props) => props.theme.spacing[12]} auto;
  }
  & > div {
    margin-top: ${(props) => props.theme.spacing["24"]};
    display: flex;
    & > button + button {
      margin-left: ${(props) => props.theme.spacing["16"]};
    }
    & > button {
      border-radius: ${(props) => props.theme.border.radius["4"]};
      border-color: ${(props) => props.theme.color.border["sub-line"]};
    }

    & > button:first-child {
      &:hover {
        color: ${(props) => props.theme.color.base.white};
        background-color: ${(props) => props.theme.color.bg["danger-bold"]};
      }
    }

    & > button:last-child {
      color: ${(props) => props.theme.color.base.white};
      background-color: ${(props) => props.theme.color.bg.brand};
    }
  }
`;
