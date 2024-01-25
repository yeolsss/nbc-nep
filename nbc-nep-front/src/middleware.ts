import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const PAGES_PATH = [
  { path: "/", dynamic: false },
  { path: "/dashboard", dynamic: false },
  { path: "/metaverse", dynamic: true },
  { path: "/signin", dynamic: false },
  { path: "/signup", dynamic: false },
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // 정적 파일, 이미지(public 포함), 프리패칭에 대한 요청을 허용하는 로직
  const isPublicResource =
    pathname.startsWith("/assets/") || pathname.startsWith("/styles/");
  const isStaticFile =
    pathname.startsWith("/_next/static/") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/);

  if (
    isStaticFile ||
    isPublicResource ||
    request.headers.get("Purpose") === "prefetch"
  ) {
    return NextResponse.next();
  }

  // request 정보가 지정한 path에 등록된 정보인지 확인
  const isDynamicPath = PAGES_PATH.some(
    (page) => page.dynamic && pathname.startsWith(`${page.path}`)
  );
  const isStaticPath = PAGES_PATH.some(
    (page) => !page.dynamic && pathname === page.path
  );

  // 등록된 정보가 아니라면
  if (!isDynamicPath && !isStaticPath) {
    console.log("허용되지 않은 경로 접근");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인 세션에 따른 조건부 처리
  if (
    !session &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/metaverse"))
  ) {
    console.log("세션이 없는데 dashboard, metaverse에 들어옴");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (
    session &&
    (pathname.startsWith("/signin") || pathname.startsWith("/signup"))
  ) {
    console.log("세션은 있는데 signin singup 페이지에 들어옴");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // 모든 경로에 대해 미들웨어를 적용
    "/(.*)",
  ],
};
