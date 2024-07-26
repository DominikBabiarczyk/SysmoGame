import { MainLayout } from "@src/layouts/MainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function FavouritesPage() {
  return (
    <MainLayout>
      <>Favourites</>
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

FavouritesPage.auth = {
  role: "USER",
};

export default FavouritesPage;
