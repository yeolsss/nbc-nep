import ModalHeader from "@/components/common/modal/ModalHeader";
import BackDrop from "@/components/modal/BackDrop";
import {
  StModalContainer,
  StModalContents,
} from "@/components/modal/spaceModals/joinSpaceModal/JoinSpaceModalMainContainer";
import {
  StAvatar,
  StInputContainer,
  StInputWrapper,
} from "@/components/spaces/AvatarInput";
import {
  StButtonWrapper,
  StCurrentProfile,
  StProfileForm,
} from "@/components/spaces/ProfileForm";
import { characterOptions } from "@/components/spaces/constants/constants";
import { StCreateInputWrapper } from "@/components/spaces/styles/spaceCommon.styles";
import useModal from "@/hooks/modal/useModal";
import { useJoinSpace } from "@/hooks/query/useSupabase";
import { validateNickname } from "@/utils/spaceValidate";
import useAuth from "@/zustand/authStore";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function AvatarModalContainer() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const { joinSpace, joinSuccess } = useJoinSpace();
  const { user } = useAuth();
  const { replace } = useRouter();

  const { closeModal, space, clearSpace } = useModal();

  const { onChange, ...restParam } = register("avatar");

  const [selectedAvatar, setSelectedAvatar] = useState("NPC1");

  const handleCloseModal = () => {
    closeModal();
    reset();
    clearSpace();
  };

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAvatar(e.target.value);
    onChange(e);
  };

  const handleEnterSpace: SubmitHandler<FieldValues> = (data) => {
    if (!space) {
      console.error("space 정보 없음 없을리가 없는데...");
      return;
    }

    joinSpace({
      space_id: space.id,
      space_avatar: data.avatar,
      space_display_name: data.nickname,
      user_id: user.id,
    });
  };

  const handleToSpace = async (spaceId: string) => {
    await replace(`/metaverse/${spaceId}`);
  };

  useEffect(() => {
    console.log({ joinSuccess, space });
    if (!joinSuccess) return;
    if (!space) return;

    handleToSpace(space.id!);
    clearSpace();
  }, [joinSuccess, space]);

  return (
    <>
      <StModalContainer>
        <ModalHeader text={"스페이스 입장하기"} handler={handleCloseModal} />
        <StModalContents>
          <StProfileForm onSubmit={handleSubmit(handleEnterSpace)}>
            <StCurrentProfile>
              <StCreateInputWrapper $isError={!!errors?.nickname}>
                <label htmlFor="nickname">닉네임</label>
                <input
                  id="nickname"
                  defaultValue={user.display_name!}
                  type="text"
                  placeholder="닉네임"
                  {...register("nickname", {
                    required: "닉네임을 입력해주십시오.",
                    validate: validateNickname,
                  })}
                />
                {errors.nickname && (
                  <span>{errors.nickname.message as string}</span>
                )}
              </StCreateInputWrapper>
            </StCurrentProfile>
            <StInputContainer>
              {characterOptions.map((option) => (
                <StInputWrapper
                  key={option.value}
                  $isSelected={selectedAvatar === option.value}
                >
                  <input
                    type="radio"
                    id={option.value}
                    value={option.value}
                    onChange={handleCustomChange}
                    {...restParam}
                  />
                  <label htmlFor={option.value} key={option.label}>
                    <StAvatar resource={option.src}></StAvatar>
                  </label>
                </StInputWrapper>
              ))}
            </StInputContainer>
            <StButtonWrapper>
              <button type="submit">확인</button>
            </StButtonWrapper>
          </StProfileForm>
        </StModalContents>
      </StModalContainer>
      <BackDrop />
    </>
  );
}