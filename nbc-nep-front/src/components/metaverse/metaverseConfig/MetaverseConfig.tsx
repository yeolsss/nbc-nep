import ModalPortal from "@/components/modal/ModalPortal";
import useModal from "@/hooks/modal/useModal";
import { useState } from "react";
import styled from "styled-components";
import { SPACE_CONFIG, VIDEO_CONFIG } from "../constants/config.contant";
import { Config } from "../types/config.types";
import ConfigAside from "./ConfigAside";
import ConfigSpace from "./ConfigSpace";
import ConfigVideo from "./ConfigVideo";

export default function MetaverseConfigModal() {
  const [currentConfigMode, setConfigMode] = useState<Config>(SPACE_CONFIG);

  const handleSelectConfigMode = (configMode: Config) => {
    setConfigMode(configMode);
  };

  const { isConfigModalOpen, closeModal } = useModal();

  return (
    <>
      {isConfigModalOpen && (
        <ModalPortal>
          <StTestDiv>
            <ConfigAside
              currentConfigMode={currentConfigMode}
              handleSelectConfigMode={handleSelectConfigMode}
            />
            {currentConfigMode === SPACE_CONFIG && <ConfigSpace />}
            {currentConfigMode === VIDEO_CONFIG && <ConfigVideo />}
          </StTestDiv>
        </ModalPortal>
      )}
    </>
  );
}

const StTestDiv = styled.div`
  width: 250px;
  position: absolute;
  top: 0;
  left: 150px;
  height: 300px;
  background-color: white;
`;
