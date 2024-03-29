import { Session } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  forgottenPasswordHandler,
  getOtherUserHandler,
  getSession,
  logoutHandler,
  signInHandler,
  signUpHandler,
  updateUserPasswordHandler,
} from "@/api/supabase/auth";
import {
  checkDmChannel,
  checkDmChannelArgs,
  getDmChannelMessages,
  getDmChannelMessagesReturns,
  getLastDmMessageList,
  getSpaceMemberInfo,
  getUserSpaces,
  readDmMessage,
  sendMessage,
  sendMessageArgs,
} from "@/api/supabase/dm";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryItems,
  getSpaceUsers,
  updateCategory,
} from "@/api/supabase/scrumBoard";
import {
  createSpaceHandler,
  getSpaceData,
  joinSpaceHandler,
  leavingSpace,
  removeSpace,
  updateSpace,
} from "@/api/supabase/space";
import { useCustomQuery } from "@/hooks/tanstackQuery/useCustomQuery";
import {
  GetKanbanItemsByAssignees,
  KanbanCategories,
  SpaceMembers,
  Spaces,
} from "@/types/supabase.tables.types";
import { Database, Tables } from "@/types/supabase.types";
import { authValidation } from "@/utils/authValidate";
import useAuthStore from "@/zustand/authStore";

/* Auth */
/* user */
// signUp
export function useSignUpUser() {
  const { mutate: signUp } = useMutation({
    mutationFn: signUpHandler,
    onError: (error) => {
      authValidation(error.message, "signUp");
    },
  });
  return signUp;
}
export function useSignInUser() {
  const { mutate: signIn } = useMutation({
    mutationFn: signInHandler,
    onError: (error) => {
      authValidation(error.message, "signIn");
    },
  });
  return signIn;
}
export function useLogoutUser() {
  const { mutate: logout } = useMutation({
    mutationFn: logoutHandler,
    onError: (error) => {
      console.error("로그아웃에러: ", error);
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

export function useGetSessionInfo() {
  const getSessionOptions = {
    queryKey: ["session"],
    queryFn: async () => {
      const result = await getSession();
      return result.session;
    },
    queryOption: { staleTime: Infinity },
  };
  return useCustomQuery<Session | null, Error>(getSessionOptions);
}

/* space */

export function useCreateSpace(
  handleOnSuccess: (data: Tables<"spaces">) => void
) {
  const client = useQueryClient();

  const {
    mutate: createSpace,
    isSuccess: createSuccess,
    isError: createError,
  } = useMutation({
    mutationFn: createSpaceHandler,
    onSuccess: (data) => {
      handleOnSuccess(data);
      client.invalidateQueries({ queryKey: ["userSpaces"] });
    },
    onError: (error) => {
      console.error("createSpaceError: ", error);
    },
  });
  return { createSpace, createSuccess, createError };
}

// insert userData to space_members
export function useJoinSpace() {
  const {
    mutate: joinSpace,
    isSuccess: joinSuccess,
    isError: joinError,
  } = useMutation({
    mutationFn: joinSpaceHandler,
    onError: (error) => {
      console.error("joinSpaceError: ", error);
    },
  });
  return { joinSpace, joinSuccess, joinError };
}

export function useGetSpace() {
  const client = useQueryClient();
  const { mutate: getSpace } = useMutation({
    mutationFn: (code: string) => getSpaceData(code),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["userSpaces"] });
    },
    onError: (error: Error) => console.error(error),
  });
  return getSpace;
}

export function useGetSpaceQuery(spaceId: string) {
  const getSpaceOptions = {
    queryKey: ["userSpaces", spaceId],
    queryFn: () => getSpaceData(spaceId),
    enabled: !!spaceId,
  };

  return useCustomQuery<Spaces, Error>(getSpaceOptions);
}

// get current user spaces
export function useGetUserSpaces(currentUserId: string) {
  const getUserSpacesOptions = {
    queryKey: ["userSpaces", currentUserId],
    queryFn: () => getUserSpaces(currentUserId),
    enabled: !!currentUserId,
  };
  return useCustomQuery<SpaceMembers[], Error>(getUserSpacesOptions);
}

export function useLeavingSpace() {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: leavingSpace,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["userSpaces"] });

      window.location.href = "/dashboard";
    },
    onError: (error) => {
      console.error("leaving space error", error);
    },
  });

  return { leavingSpace: mutate };
}

/* dm */
// check dmChannel with otherUser
export function useGetDmChannel({
  receiverId,
  spaceId,
}: Omit<checkDmChannelArgs, "currentUserId">) {
  const { id: currentUserId } = useAuthStore.use.user();
  const getDmChannelOptions = {
    queryKey: ["dmChannel", receiverId],
    queryFn: () => checkDmChannel({ receiverId, currentUserId, spaceId }),
    enabled: !!currentUserId,
  };
  return useCustomQuery<string | null, Error>(getDmChannelOptions);
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
  const { id: currentUserId } = useAuthStore.use.user();
  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: ({
      currentDmChannel,
      message: msg,
      receiverId,
      spaceId,
    }: Omit<sendMessageArgs, "currentUserId">) =>
      sendMessage({
        currentDmChannel,
        message: msg,
        receiverId,
        spaceId,
        currentUserId,
      }),
    onError: (error) => {
      console.log("sendError: ", error);
    },
  });
  return sendMessageMutation;
}

export function useGetLastDMList(spaceId: string, userId: string) {
  const queryOptions = {
    queryKey: ["lastDMList"],
    queryFn: async () => {
      const result = await getLastDmMessageList(spaceId, userId);
      return result || [];
    },
    enabled: !!spaceId && !!userId,
    queryOptions: { staleTime: Infinity },
  };

  return useCustomQuery<
    Database["public"]["Functions"]["get_last_dm_message_list"]["Returns"],
    Error
  >(queryOptions);
}

export function useReadDMMessage() {
  const queryClient = useQueryClient();
  const { mutate, isError, isPending } = useMutation({
    mutationFn: readDmMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lastDMList"] });
    },
  });

  return { mutate, isError, isPending };
}

/* ScrumBoard */

/* Category */
export function useGetCategories(spaceId: string) {
  const queryOptions = {
    queryKey: ["categoryList", spaceId],
    queryFn: () => getCategories(spaceId),
    enabled: !!spaceId,
    options: { staleTime: Infinity },
  };

  return useCustomQuery<KanbanCategories[], Error>(queryOptions);
}

export function useGetCategoryItems(categoryId: string) {
  const queryOptions = {
    queryKey: ["categoryItem", categoryId],
    queryFn: () => getCategoryItems(categoryId),
    enabled: !!categoryId,
    options: { staleTime: Infinity },
  };

  return useCustomQuery<GetKanbanItemsByAssignees[] | null, Error>(
    queryOptions
  );
}

export function useCreateCategory(spaceId: string) {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList", spaceId] });
    },
  });

  return { create, isError, isSuccess };
}

export function useUpdateCategory(spaceId: string) {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("카테고리가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["categoryList", spaceId] });
    },
  });

  return { update, isError, isSuccess };
}

export function useDeleteCategory(spaceId: string) {
  const queryClient = useQueryClient();
  const {
    mutate: remove,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("카테고리가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["categoryList", spaceId] });
    },
  });

  return { remove, isError, isSuccess };
}

/* Auth again */
export function useForgetPassword() {
  const { mutate: forgetPassword, isPending } = useMutation({
    mutationFn: forgottenPasswordHandler,
  });

  return { forgetPassword, isPending };
}

export function useUpdateUserPw() {
  const { mutate: updateUser } = useMutation({
    mutationFn: updateUserPasswordHandler,
    onError: (error) => {
      authValidation(error.message, "changePassword");
    },
  });
  return updateUser;
}

export function useUpdateSpaceInfo() {
  const client = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: updateSpace,
    onSuccess: (spaceInfo) => {
      const spaceId = spaceInfo.id;
      client.invalidateQueries({ queryKey: ["spaceInfo", spaceId] });
      client.invalidateQueries({ queryKey: ["userSpaces", spaceInfo.owner] });
      toast.success("수정이 완료됐습니다!", { position: "top-right" });
    },
    onError: () => {},
  });

  return { updateSpace: mutate, ...rest };
}

export function useDeleteSpace() {
  const client = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: removeSpace,
    onSuccess: (spaceId) => {
      client.invalidateQueries({ queryKey: ["spaceInfo", spaceId] });
    },
    onError: () => {},
  });

  return { deleteSpace: mutate, ...rest };
}

export function useGetSpaceMember({
  spaceId,
  userId,
}: {
  spaceId: string;
  userId: string;
}) {
  const queryOptions = {
    queryKey: ["spaceMember", spaceId, userId],
    queryFn: () => getSpaceMemberInfo({ spaceId, userId }),
    enabled: !!spaceId,
    options: { staleTime: Infinity },
  };
  return useCustomQuery<Tables<"space_members">, Error>(queryOptions);
}

export function useGetSpaceMembers(spaceId: string) {
  const queryOptions = {
    queryKey: ["spaceMembers", spaceId],
    queryFn: () => getSpaceUsers(spaceId),
    enabled: !!spaceId,
    options: { staleTime: Infinity },
  };
  return useCustomQuery<Tables<"space_members">[], Error>(queryOptions);
}
