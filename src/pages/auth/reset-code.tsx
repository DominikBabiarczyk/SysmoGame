import { ResetCodeScreen } from "@src/features/auth/reset/ResetCodeScreen";
import { AuthLayout } from "@src/layouts/AuthLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function ResetCodePage() {
  return (
    <AuthLayout>
      <ResetCodeScreen />
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

ResetCodePage.auth = {
  role: "AUTH",
};

export default ResetCodePage;
