import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import * as St from "@/components/auth/styles/authCommon.styles";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthHeroBanner from "@/components/auth/AuthHeroBanner";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";

export default function SignIn() {
  return (
    <StSignInOuterContainer>
      <AuthHeroBanner formType="signIn" />
      <AuthFormContainer>
        <St.ChangeAuthPage>
          아직 계정을 만들기 전인가요?
          <Link href={"/signup"}>지금 가입하기</Link>
        </St.ChangeAuthPage>
        <h1>어서오세요 :)</h1>
        <SocialLogin subText="SNS 로그인" />
        <AuthDivider />
        <AuthForm formType="signIn" />
        <AuthFooter />
      </AuthFormContainer>
    </StSignInOuterContainer>
  );
}

const StSignInOuterContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
