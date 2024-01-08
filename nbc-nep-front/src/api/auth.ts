import { supabase } from "@/libs/supabase";

/**
 * 회원가입
 */
type signUpHandlerArgs = {
  email: string;
  password: string;
  nickname: string;
};
export const signUpHandler = async ({
  email,
  password,
  nickname,
}: signUpHandlerArgs) => {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: nickname,
      },
    },
  });
  if (signUpData) return signUpData;
  if (signUpError) return signUpError;
};

/**
 * 일반 로그인
 */
type loginHandlerArgs = {
  email: string;
  password: string;
};
export const loginHandler = async ({ email, password }: loginHandlerArgs) => {
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userData) return userData;
  if (userError) return userError;
};