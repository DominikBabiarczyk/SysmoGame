import { LoginScreen } from "@src/features/auth/login/LoginScreen";
import { AuthLayout } from "@src/layouts/AuthLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function LoginPage() {
  return (
    <AuthLayout>
      <LoginScreen />
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

LoginPage.auth = {
  role: "AUTH",
};

export default LoginPage;
