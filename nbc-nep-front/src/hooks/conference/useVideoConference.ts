import { isEmpty } from "lodash";
import { RtpCapabilities } from "mediasoup-client/lib/RtpParameters";
import { useEffect } from "react";

import useDevice from "@/hooks/conference/useDevice";
import useRecvTransport from "@/hooks/conference/useRecvTransport";
import useSendTransport from "@/hooks/conference/useSendTransport";
import useVideoSource from "@/hooks/conference/useVideoSource";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import useAuth from "@/zustand/authStore";

import { videoParams } from "@/components/video-conference/constants";
import {
  AppData,
  Producer,
  ProducerForConsume,
  ShareType,
  TransPortParams,
} from "@/types/conference.types";

import useSocket from "./useSocket";

export default function useVideoConference() {
  const {
    socket,
    joinRoom,
    createTransport,
    closeProducer,
    getProducers,
    transportRecvConsume,
    closeTransport: transportClose,
  } = useSocket();

  const { spaceId, findPlayerById } = useMetaversePlayer();

  const {
    user: { id: currentPlayerId },
  } = useAuth();

  const {
    handleProducerClose,
    handleProducerRemoval,
    handleRemoveConsumer,
    isAlreadyConsume,
    addProducer,
    addConsumer,
    removeProducer,
  } = useVideoSource();

  const {
    loadDevice,
    getRtpCapabilitiesFromDevice,
    createSendTransportWithDevice,
    createRecvTransportWithDevice,
  } = useDevice();

  const { sendTransport, createSendTransport } = useSendTransport({
    socket,
    createSendTransportWithDevice,
    playerId: currentPlayerId,
  });

  const { consume, createRecvTransport } = useRecvTransport({
    socket,
    createRecvTransportWithDevice,
    playerId: currentPlayerId,
  });

  const currentPlayer = findPlayerById(currentPlayerId);

  function handleConsumeNewProducer(producerId: string, appData: AppData) {
    if (isAlreadyConsume(producerId)) {
      return;
    }

    try {
      const rtpCapabilities = getRtpCapabilitiesFromDevice();
      transportRecvConsume(
        { rtpCapabilities, producerId, appData, playerId: currentPlayerId },
        async (params) => {
          const consumer = await consume({ ...params });
          if (!consumer) {
            return null;
          }
          addConsumer(consumer);
          return consumer;
        }
      );
    } catch (error) {
      console.table(error);
    }
  }

  function handleConsumeProducers(producersForConsume: ProducerForConsume[]) {
    producersForConsume.forEach(({ id, appData }) =>
      handleConsumeNewProducer(id, appData)
    );
  }
  async function handleCreatedTransport(
    rtpCapabilities: RtpCapabilities,
    sendTransportParams: TransPortParams,
    recvTransportParams: TransPortParams
  ) {
    await loadDevice(rtpCapabilities);
    createSendTransport(sendTransportParams);
    createRecvTransport(recvTransportParams);

    getProducers(spaceId, currentPlayerId, handleConsumeProducers);
  }

  async function handleShare(stream: MediaStream, type: ShareType) {
    try {
      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      const isVideoTrackEmpty = isEmpty(videoTracks);

      const tracks = isVideoTrackEmpty ? audioTracks : videoTracks;
      const produceParams = isVideoTrackEmpty ? {} : { ...videoParams };

      const track = tracks[0];

      const producer = await sendTransport.current?.produce({
        track,
        ...produceParams,
        appData: {
          trackId: track.id,
          streamId: stream.id,
          playerId: currentPlayerId,
          shareType: type,
        },
      });

      if (!producer) {
        throw new Error("no producer...");
      }

      track.addEventListener("ended", () => {
        removeProducer(producer);
      });

      addProducer(producer);
    } catch (error) {
      console.table(error);
    }
  }

  const handleStopShare = (type: ShareType) => {
    handleProducerRemoval(type, (producer: Producer) => {
      closeProducer(currentPlayerId, producer.appData.streamId);
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      joinRoom(spaceId, currentPlayerId);
      createTransport(currentPlayerId, handleCreatedTransport);
    });

    socket.on("new-producer", handleConsumeNewProducer);
    socket.on("producer-closed", handleProducerClose);
    socket.on("consumer-closed", handleRemoveConsumer);

    return () => {
      transportClose(currentPlayerId);
      socket.off("new-producer", handleConsumeProducers);
      socket.off("producer-closed", handleProducerClose);
      socket.off("consumer-closed", handleRemoveConsumer);
      socket.disconnect();
    };
  }, []);

  return {
    handleStopShare,
    handleShare,
    currentPlayer,
  };
}
