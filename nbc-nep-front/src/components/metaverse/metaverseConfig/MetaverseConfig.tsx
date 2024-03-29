import ModalPortal from "@/components/modal/ModalPortal";
import useModal from "@/hooks/modal/useModal";
import { useState } from "react";
import { Config } from "@/types/metaverse.types";
import {
  StConfigHeader,
  StConfigModalWrapper,
} from "@/components/metaverse/styles/metaverse.styles";
import {
  CHAT_CONFIG,
  SPACE_CONFIG,
  VIDEO_CONFIG,
} from "../constants/config.constant";
import ConfigAside from "./ConfigAside";
import ConfigSpace from "./ConfigSpace";
import ConfigSpaceChat from "./ConfigSpaceChat";
import ConfigVideo from "./ConfigVideo";

export default function MetaverseConfigModal() {
  const [currentConfigMode, setConfigMode] = useState<Config>(SPACE_CONFIG);

  const handleSelectConfigMode = (configMode: Config) => {
    setConfigMode(configMode);
  };

  const { isConfigModalOpen, closeModal } = useModal();

  return (
    isConfigModalOpen && (
      <ModalPortal>
        <StConfigModalWrapper>
          <StConfigHeader>
            <h2>설정</h2>
            <button type="button" onClick={() => closeModal()}>
              close config modal
            </button>
          </StConfigHeader>

          <ConfigAside
            currentConfigMode={currentConfigMode}
            handleSelectConfigMode={handleSelectConfigMode}
          />
          {currentConfigMode === SPACE_CONFIG && <ConfigSpace />}
          {currentConfigMode === VIDEO_CONFIG && <ConfigVideo />}
          {currentConfigMode === CHAT_CONFIG && <ConfigSpaceChat />}
        </StConfigModalWrapper>
      </ModalPortal>
    )
  );
}
