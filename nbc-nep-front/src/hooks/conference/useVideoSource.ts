import { MAX_SHARE_SCREEN_SIZE } from "@/components/video-conference/constants";
import { Producer, ShareType } from "@/types/conference.types";
import useConferenceStore from "@/zustand/conferenceStore";
import { toast } from "react-toastify";

const useVideoSource = () => {
  const removeConsumer = useConferenceStore.use.removeConsumer();
  const removeProducer = useConferenceStore.use.removeProducer();
  const findProducerByShareType =
    useConferenceStore.use.findProducerByShareType();
  const isAlreadyConsume = useConferenceStore.use.isAlreadyConsume();
  const addProducer = useConferenceStore.use.addProducer();
  const addConsumer = useConferenceStore.use.addConsumer();
  const producers = useConferenceStore.use.producers();

  const handleProducerClose = (streamId: string) => {
    removeConsumer(streamId);
  };

  const handleProducerRemoval = (
    type: ShareType,
    onStopShare: (producer: Producer) => void
  ) => {
    const producer = findProducerByShareType(type);

    if (!producer) {
      console.error("producer가 존재하지 않습니다.");
      toast.error(
        "producer가 존재하고 있지 않습니다. 새로고침을 시도해주시길 바랍니다.",
        { position: "top-center" }
      );
      return;
    }

    removeProducer(producer);

    try {
      onStopShare(producer);
    } catch (error) {
      console.error("onStopShare 실행 중 오류 발생", error);
    }
  };

  const screenCount = producers.filter(
    (producer) => producer.appData.shareType === "screen"
  ).length;
  const isCanShare = screenCount < MAX_SHARE_SCREEN_SIZE;

  return {
    handleProducerClose,
    handleProducerRemoval,
    handleRemoveConsumer: handleProducerClose,
    isAlreadyConsume,
    removeProducer,
    addProducer,
    addConsumer,
    screenCount,
    isCanShare,
  };
};

export default useVideoSource;
