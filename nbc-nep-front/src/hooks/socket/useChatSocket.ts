import { Chat } from "@/components/metaverse/types/metaverse";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import useMetaversePlayer from "../metaverse/useMetaversePlayer";

export default function useChatSocket(playerDisplayName: string | null = "") {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const socket = useRef<Socket | null>(null);
  const { spaceId } = useMetaversePlayer();

  const { handleSetGlobalChatAlarmState } = useChatAlarm();

  useEffect(() => {
    if (socket.current || !spaceId) return;

    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/chat`);

    socket.current.emit("joinRoom", spaceId);

    socket.current.on("receiveMessage", (data) => {
      setChatList((prev) => [...prev, data]);
      handleSetGlobalChatAlarmState(true);
    });

    socket.current.on("removedRoom", () => {
      window.location.href = "/dashboard";
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [spaceId]);

  const sendChatMessage = (message: string) => {
    const newChat = { playerDisplayName, message, spaceId };
    socket.current?.emit("sendMessage", newChat);
  };

  const emitRemoveSpace = () => {
    socket.current?.emit("removeRoom");
  };

  return { chatList, sendChatMessage, emitRemoveSpace };
}
