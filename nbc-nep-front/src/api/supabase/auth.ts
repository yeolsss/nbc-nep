import { supabase } from "@/supabase/supabase";
import { Tables } from "@/supabase/types/supabase";

import { Session } from "@supabase/supabase-js";

/**
 * Supabase 회원가입을 위한 함수
 * @param string email - 회원가입에 사용할 email
 * @param string password - 회원가입에 사용할 password
 * @param string nickname - 회원가입에 사용할 nickname
 */
interface SignUpHandlerArgs {
  email: string;
  password: string;
  nickname: string;
}
export const signUpHandler = async ({
  email,
  password,
  nickname,
}: SignUpHandlerArgs) => {
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: nickname,
      },
    },
  });
  if (signUpError) return signUpError;
};

/**
 * Supabase 로그인을 위한 함수
 * @param string email - 로그인에 사용할 email (선택적 입력가능)
 * @param string password - 로그인에 사용할 password (선택적 입력가능)
 * @param LoginPlatformType(string union) platform - 로그인 방식
 */
export type SignInPlatformType = "email" | "google" | "kakao" | "github";

interface SignInHandlerArgs {
  email?: string;
  password?: string;
  platform: SignInPlatformType;
}

const err = (e: never) => {};
export const signInHandler = async ({
  email,
  password,
  platform,
}: SignInHandlerArgs) => {
  switch (platform) {
    case "email":
      const { data: emailLoginData, error: emailLoginError } =
        await supabase.auth.signInWithPassword({
          email: email!,
          password: password!,
        });

      if (emailLoginError) throw emailLoginError;
      return emailLoginData;
    case "google":
    case "kakao":
    case "github":
      const { data: oAuthLoginData, error: oAuthLoginError } =
        await supabase.auth.signInWithOAuth({
          provider: platform,
          options: {
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          },
        });
      if (oAuthLoginError) throw oAuthLoginError;
      return oAuthLoginData;
    default:
      err(platform);
      throw new Error("LoginError: 올바른 케이스가 아닙니다.");
  }
};

/**
 * Supabase 로그아웃을 위한 함수
 */
export const logoutHandler = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * Supabase 현재 로그인 된 유저 정보를 가져오는 함수
 * @returns table <users|null>
 */
// export const getUserSessionHandler = async (
//   session: Session
// ): Promise<Tables<"users"> | null> => {
export const getUserSessionHandler = async (session: Session): Promise<any> => {
  const { data: currentUserInfo, error } = await supabase
    .from("users")
    .select(`*`)
    .eq("id", session.user.id!)
    .single();

  if (error) throw error;
  return currentUserInfo;
};

/**
 * Supabase 특정 유저 정보를 가져오는 함수
 * @param string otherUserId - 정보를 가져올 유저 아이디
 * @returns table <users>
 */

export const getOtherUserHandler = async (
  otherUserId: string
): Promise<Tables<"users"> | null> => {
  const { data: userInfo } = await supabase
    .from("users")
    .select(`*`)
    .eq("id", otherUserId)
    .single();
  return userInfo;
};
