import { toast } from "react-toastify";
import { AuthFormType } from "@/types/auth.types";

// email validation check function
export function handleValidateEmail(value: string) {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailReg.test(value) || "유효하지 않은 이메일 입니다.";
}

// password validation check function
export function handleValidatePassword(value: string) {
  const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  return (
    pwReg.test(value) || "문자, 숫자, 특수문자를 포함 8자리 이상을 입력하세요."
  );
}

// nickname validation check function
export function handleValidateNickname(value: string) {
  const nicknameReg = /^.{2,8}$/;
  return nicknameReg.test(value) || "닉네임은 최소 2글자, 최대 8글자 입니다.";
}
// password check validation check function
export function handleValidatePasswordMatch(
  value: string,
  watchValue?: string
) {
  return value === watchValue || "비밀번호가 일치하지 않습니다.";
}

export function authValidation(errorMessage: string, mode: AuthFormType) {
  switch (errorMessage) {
    case "Invalid login credentials":
      toast.error("일치하는 로그인 정보가 없습니다.");
      break;
    case "User already registered":
      toast.error("이미 존재하는 유저입니다.");
      break;
    case "New password should be different from the old password.":
      toast.error("기존 비밀번호와 동일한 비밀번호입니다.");
      break;
    case "For security purposes, you can only request this once every 60 seconds":
      return "60초에 한 번만 요청할 수 있습니다.";
    default:
      if (mode === "signIn") {
        toast.error("로그인 오류");
      }
      if (mode === "signUp") {
        toast.error("회원가입 오류");
      }
      if (mode === "changePassword") {
        toast.error("비밀번호 변경 오류");
      }
      break;
  }
  return undefined;
}
