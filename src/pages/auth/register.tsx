import { RegisterScreen } from "@src/features/auth/register/RegisterScreen";
import { AuthLayout } from "@src/layouts/AuthLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterScreen />
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

RegisterPage.auth = {
  role: "AUTH",
};

export default RegisterPage;
