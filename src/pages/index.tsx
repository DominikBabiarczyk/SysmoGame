import { ProductListScreen } from "@src/features/product/screens/ProductListScreen";
import { MainLayout } from "@src/layouts/MainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/welcom/Welcom");
  },[router])
  
  return (
    // <MainLayout>
    //   <></>
    //   <ProductListScreen />    
    // </MainLayout>

    <div className="w-full h-full bg-extendedColors-background-main">
    </div>

  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth"])),
    },
  };
}

IndexPage.auth = {
  role: "OTHER",
};

export default IndexPage;
