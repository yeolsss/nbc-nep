import { getUserSessionHandler } from "@/api/supabase/auth";
import { supabase } from "@/supabase";
import useAuthStore from "@/zustand/authStore";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function CheckUserSession() {
  const logout = useAuthStore.use.logout();
  const login = useAuthStore.use.login();
  const sessionRef = useRef<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "INITIAL_SESSION":
        case "SIGNED_IN":
          if (!session) return;
          getUserSessionHandler(session)
            .then((userData) => {
              if (
                !sessionRef.current &&
                router.pathname !== "/changepassword" &&
                router.pathname !== "/dashboard" &&
                !router.pathname.includes("/metaverse")
              ) {
                toast.success(`${userData.display_name}님 로그인 성공`);
                sessionRef.current = session;
              }
              login(userData);
            })
            .catch((error) => {
              console.log(error);
            });
          break;

        case "SIGNED_OUT":
          sessionRef.current = null;
          if (router.pathname !== "/changepassword") {
            toast.error("로그아웃 되었습니다");
            window.location.href = "/";
          } else {
            logout();
          }
          break;

        default:
          break;
      }
    });

    return () => {
      channel.data.subscription.unsubscribe();
    };
  }, []);

  return <div />;
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
