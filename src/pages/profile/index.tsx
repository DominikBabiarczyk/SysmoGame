import { UserProfileScreen } from "@src/features/profile/screens/UserProfileScreen";
import { MainLayout } from "@src/layouts/MainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function ProfilePage() {
  return (
    <MainLayout>
      <UserProfileScreen />
    </MainLayout>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth", "profile"])),
    },
  };
}

ProfilePage.auth = {
  role: "USER",
};

export default ProfilePage;
