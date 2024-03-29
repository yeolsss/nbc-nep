import CustomHead from "@/SEO/CustomHead";
import Layout from "@/components/layout/Layout";
import ScrumBoard from "@/components/scrumboard/detail/ScrumBoard";
import { ReactElement } from "react";

function ScrumBoardPage(): ReactElement {
  return (
    <>
      <CustomHead title="scrumboard" description="스크럼 보드 페이지입니다." />
      <ScrumBoard />
    </>
  );
}

ScrumBoardPage.getLayout = function getLayout(
  page: ReactElement
): ReactElement {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default ScrumBoardPage;
