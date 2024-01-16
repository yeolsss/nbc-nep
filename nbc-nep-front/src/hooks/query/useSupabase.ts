import {
  getOtherUserHandler,
  loginHandler,
  logoutHandler,
  signUpHandler,
} from "@/api/supabase/auth";
import {
  checkDmChannel,
  checkDmChannelArgs,
  getDmChannelMessages,
  getDmChannelMessagesReturns,
  getSpaceUsers,
  getUserSpaces,
  sendMessage,
  sendMessageArgs,
} from "@/api/supabase/dm";
import { getSpaceData, joinSpaceHandler } from "@/api/supabase/space";
import { useCustomQuery } from "@/hooks/tanstackQuery/useCustomQuery";
import { Tables } from "@/types/supabase";
import { Space_members } from "@/types/supabase.tables.type";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../useReduxTK";

/* Auth */
/* user */
// signUp
export function useSignUpUser() {
  const { mutate: signUp } = useMutation({
    mutationFn: signUpHandler,
    onError: (error) => {
      // TODO: error메시지 핸들링 필요
      console.log(error);
    },
  });
  return signUp;
}
// Login
export function useLoginUser() {
  const { mutate: login } = useMutation({
    mutationFn: loginHandler,
    onError: (error) => {
      console.log("로그인에러:", error);
    },
  });
  return login;
}
// Logout
export function useLogoutUser() {
  const { mutate: logout } = useMutation({
    mutationFn: logoutHandler,
    onError: (error) => {
      console.log("로그아웃에러: ", error);
    },
  });
  return logout;
}

// 특정유저의 정보를 가져오는 함수
export function useGetOtherUserInfo(otherUserId: string) {
  const getOtherUserOptions = {
    queryKey: ["otherUser", otherUserId],
    queryFn: () => getOtherUserHandler(otherUserId),
    queryOptions: { staleTime: Infinity },
    enabled: !!otherUserId,
  };

  return useCustomQuery<Tables<"users"> | null, Error>(getOtherUserOptions);
}

/* space */
// insert userData to space_members
export function useJoinSpace() {
  const {
    mutate: joinSpace,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: joinSpaceHandler,
    onError: (error) => {
      console.error("joinSpaceError: ", error);
    },
  });
  return { joinSpace, isSuccess, isError };
}
// spaceId 로 스페이스를 조회하여 테이블 데이터를 가져온다.
export function useGetSpace() {
  const { mutate: validateSpace, isError } = useMutation({
    mutationFn: getSpaceData,
  });
  return { validateSpace, isError };
}

// get current user spaces
export function useGetUserSpaces(currentUserId: string) {
  const getUserSpacesOptions = {
    queryKey: ["userSpaces"],
    queryFn: () => getUserSpaces(currentUserId),
    enabled: !!currentUserId,
  };
  return useCustomQuery<Space_members[], Error>(getUserSpacesOptions);
}

// get current space all users
export function useGetCurrentSpaceUsers(spaceId: string) {
  const getCurrentSpaceUsersOptions = {
    queryKey: ["currentSpaceUsers", spaceId],
    queryFn: () => getSpaceUsers(spaceId),
    enabled: !!spaceId,
  };
  return useCustomQuery<Space_members[] | null, Error>(
    getCurrentSpaceUsersOptions
  );
}

/* dm */
// check dmChannel with otherUser
export function useGetDmChannel({
  receiverId,
  spaceId,
}: Omit<checkDmChannelArgs, "currentUserId">) {
  const currentUserId = useAppSelector((state) => state.authSlice.user.id);
  const getDmChannelOptions = {
    queryKey: ["dmChannel", receiverId],
    queryFn: () => checkDmChannel({ receiverId, currentUserId, spaceId }),
    enabled: !!currentUserId,
  };
  const data = useCustomQuery<string | null, Error>(getDmChannelOptions);
  return data;
}

// Dm채널 유무 확인 후 기존 메시지 가져오기
export function useGetDmMessages(dmChannel: string | null) {
  const getDmMessagesOptions = {
    queryKey: ["dmMessages", dmChannel],
    queryFn: () => getDmChannelMessages(dmChannel),
    enabled: !!dmChannel,
  };
  return useCustomQuery<getDmChannelMessagesReturns[], Error>(
    getDmMessagesOptions
  );
}

// 메시지 보내기
export function useSendMessage() {
  const currentUserId = useAppSelector((state) => state.authSlice.user.id);
  const { mutate: message } = useMutation({
    mutationFn: ({
      currentDmChannel,
      message,
      receiverId,
      spaceId,
    }: Omit<sendMessageArgs, "currentUserId">) =>
      sendMessage({
        currentDmChannel,
        message,
        receiverId,
        spaceId,
        currentUserId,
      }),
    onError: (error) => {
      console.log("sendError: ", error);
    },
  });
  return message;
}
