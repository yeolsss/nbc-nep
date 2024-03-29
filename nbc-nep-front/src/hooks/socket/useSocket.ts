import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { PlayerState } from "@/types/metaverse.types";

interface Props {
  namespace: string;
}

export default function useSocket({ namespace }: Props) {
  const socketRef = useRef<Socket>(
    io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}${namespace}`, {
      withCredentials: true,
      autoConnect: false,
    })
  );

  const handleConnect = () => {};

  useEffect(() => {
    const socket = socketRef.current;

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, []);

  const disconnect = () => {
    socketRef.current?.disconnect();
  };

  const connect = () => {
    if (socketRef.current.connected) {
      return;
    }
    socketRef.current.connect();
  };

  const changePlayerState = (playerId: string, state: PlayerState) => {
    socketRef.current?.emit("change-player-state", playerId, state);
  };

  return {
    socket: socketRef.current,
    disconnect,
    connect,
    changePlayerState,
  };
}
