import { splitVideoSource } from "@/components/video-conference/libs/util";
import useLayout from "@/hooks/conference/useLayout";
import useConferenceStore from "@/zustand/conferenceStore";
import { isEmpty } from "lodash";
import styled from "styled-components";
import ShareScreenContainer from "../ShareScreenContainer";
import { Producer } from "../../../types/conference.types";
import OtherPlayerShareMediaItem from "./OtherPlayerShareMediaItem";
import PlayerMediaDisplay from "./PlayerMediaDisplay";
import PlayerProducerContainer from "./PlayerProducerContainer";
import { Player } from "@/types/metaverse.types";

interface Props {
  playerList: Player[];
  currentPlayer: Player;
}

export default function VideoSourceDisplayContainer({
  playerList,
  currentPlayer,
}: Props) {
  const { isOpen } = useLayout();
  const producers = useConferenceStore.use.producers();

  const [camAndAudioProducers, screenProducers] = splitVideoSource(producers);
  const isEmptyScreenProducers = isEmpty(screenProducers);

  return (
    <StContainer>
      <PlayerMediaDisplay
        camAndAudioVideoSources={camAndAudioProducers}
        player={currentPlayer}
        isCurrentPlayer={true}
      />
      {!isEmptyScreenProducers && (
        <PlayerProducerContainer
          nickname={currentPlayer?.nickname || ""}
          producers={screenProducers as Producer[]}
        />
      )}
      {playerList.map((player) => (
        <OtherPlayerShareMediaItem
          player={player}
          currentPlayerId={currentPlayer?.playerId}
          key={player.playerId}
        />
      ))}
      {isOpen && <ShareScreenContainer />}
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${(props) => props.theme.spacing[32]};

  position: absolute;
  right: ${(props) => props.theme.spacing[16]};
  top: ${(props) => props.theme.spacing[32]};

  overflow-y: auto;
  overflow-x: hidden;
  flex-wrap: nowrap;

  width: 30rem;
  padding-right: 2rem;
  padding-top: 2rem;
  height: auto;
  max-height: 90vh;

  * {
    flex-shrink: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
