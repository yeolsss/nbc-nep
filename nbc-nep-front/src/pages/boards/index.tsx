import CustomHead from "@/SEO/CustomHead";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Board: NextPageWithLayout = () => {
  const router = useRouter();
  const handleToScrumboard = async () => {
    await router.push("/boards/scrumboards/test");
  };
  const handleToIdeaboard = async () => {
    await router.push("/boards/ideaboards/test");
  };

  return (
    <>
      <CustomHead title={"board"} description="board 페이지입니다." />
      <h1>boards</h1>
      <div>
        <button onClick={handleToScrumboard}>스크럼보드</button>
        <button onClick={handleToIdeaboard}>아이디어보드</button>
      </div>
    </>
  );
};

Board.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async () => {
  return { props: {} };
};

export default Board;
