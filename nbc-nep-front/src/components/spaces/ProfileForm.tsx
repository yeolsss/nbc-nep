import { useCreateSpace, useJoinSpace } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { validateNickname } from "@/utils/spaceFormValidate";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { Tables } from "@/types/supabase";
import AvatarInput from "./AvatarInput";
import { FORM_SPACE } from "./constatns/constants";
import { Procedure, SpaceInfo, UserProfile } from "./types/space.types";

interface ProfileFormProps {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  spaceId?: string;
  spaceInfo?: SpaceInfo;
  defaultDisplayName: string;
  errors: FormState<FieldValues>["errors"];
  mode: "createSpace" | "joinSpace";
}

export default function ProfileForm({
  setProcedure,
  handleSubmit,
  register,
  spaceId = "",
  spaceInfo: partialSpaceInfo,
  defaultDisplayName,
  errors,
  mode,
}: ProfileFormProps) {
  const {
    joinSpace,
    isSuccess: joinSuccess,
    isError: joinError,
  } = useJoinSpace();

  const {
    createSpace,
    isSuccess: createSuccess,
    isError: createError,
  } = useCreateSpace((data: Tables<"spaces">) => {
    handleToSpace(data.id);
  });

  const { id: userId } = useAppSelector((state) => state.authSlice.user);
  const router = useRouter();

  useEffect(() => {
    if (joinSuccess) {
      handleToSpace(partialSpaceInfo?.id!);
      return;
    }
  }, [joinSuccess, createSuccess, spaceId]);

  const handleToSpace = async (space_id: string) => {
    await router.replace(`/metaverse/${space_id!}`);
  };

  const handleToPrevious = () => {
    setProcedure(FORM_SPACE);
  };

  const handleProfileSubmit: SubmitHandler<FieldValues> = (data) => {
    switch (mode) {
      case "joinSpace":
        const userProfile: UserProfile = {
          space_id: partialSpaceInfo?.id!,
          space_avatar: data.avatar,
          space_display_name: data.nickname,
          user_id: userId,
        };
        joinSpace(userProfile);
        break;
      case "createSpace":
        console.log(data);
        const spaceInfo: SpaceInfo = {
          title: partialSpaceInfo?.title,
          owner: userId,
          space_display_name: data.nickname,
          space_avatar: data.avatar,
          description: partialSpaceInfo?.description,
        };
        createSpace(spaceInfo);
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit(handleProfileSubmit)}>
      <input
        defaultValue={defaultDisplayName}
        type="text"
        placeholder="닉네임"
        {...register("nickname", {
          required: "닉네임을 입력해주십시오.",
          validate: validateNickname,
        })}
      />
      {errors.nickname && <span>{errors.nickname.message as string}</span>}
      <AvatarInput register={register} errors={errors} />
      {errors.avatar && <span>errors.avatar.message</span>}
      <button type="submit">확인</button>
      <button type="button" onClick={handleToPrevious}>
        뒤로 가기
      </button>
    </form>
  );
}
