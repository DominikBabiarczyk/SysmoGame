import { CodeScreen } from "@src/features/auth/code/CodeScreen";
import { AuthLayout } from "@src/layouts/AuthLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function CodePage() {
  return (
    <AuthLayout>
      <CodeScreen />
    </AuthLayout>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth", "common"])),
    },
  };
}

CodePage.auth = {
  role: "AUTH",
};

export default CodePage;
