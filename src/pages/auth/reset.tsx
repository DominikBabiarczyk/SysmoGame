import { ResetScreen } from "@src/features/auth/reset/ResetScreen";
import { AuthLayout } from "@src/layouts/AuthLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function ResetPage() {
  return (
    <AuthLayout>
      <ResetScreen />
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

ResetPage.auth = {
  role: "AUTH",
};

export default ResetPage;
