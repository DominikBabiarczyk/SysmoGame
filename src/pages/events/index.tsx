import { MainLayout } from "@src/layouts/MainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function EventsPage() {
  return (
    <MainLayout>
      <>Events</>
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

EventsPage.auth = {
  role: "USER",
};

export default EventsPage;
