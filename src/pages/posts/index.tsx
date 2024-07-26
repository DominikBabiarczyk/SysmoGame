import { MainLayout } from "@src/layouts/MainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function PostsPage() {
  return (
    <MainLayout>
      <>Posts</>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "auth",
        "profile",
        "product",
        "posts",
        "favorite",
      ])),
    },
  };
}

PostsPage.auth = {
  role: "USER",
};

export default PostsPage;
