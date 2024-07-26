import React from "react";
import { Box, Text } from "@src/common/atoms";
import { Icon } from "@src/assets/Icon";
import { useTheme } from "@src/theme/theme";
import { useT } from "@src/i18n/useTranslation";
import { CurrentUser } from "@src/models/user";
import { useRouter } from "next/router";
import { useLogout } from "@src/utils/getAppState";

interface ProfileProps {
  user: CurrentUser;
}

export const Profile = ({ user }: ProfileProps) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { t } = useT();
  const logout = useLogout();

  const onLogout = () => {
    logout();
  };

  return (
    <Box
      className="md:w-[600px]"
      style={{
        paddingBottom: 80,
        paddingTop: 20,
        padding: "0 20px",
        flexGrow: 1,
        margin: "auto",
      }}
    >
      <Box className="gap-3">
        <Box
          className="cursor-pointer"
          onClick={() => router.push("/products")}
        >
          <Text className="border-b border-app-neutral-300/50 pb-1 text-sm font-semibold text-app-neutral-300">
            {t("profile:my-products")}
          </Text>
        </Box>

        <Box className="cursor-pointer">
          <Text className="border-b border-app-neutral-300/50 pb-1 text-sm font-semibold text-app-neutral-300">
            Lorem ipsum
          </Text>
        </Box>
        <Box className="cursor-pointer">
          <Text className="border-b border-app-neutral-300/50 pb-1 text-sm font-semibold text-app-neutral-300">
            Lorem ipsum
          </Text>
        </Box>
      </Box>

      <Box
        onClick={onLogout}
        className="relative mt-10 flex cursor-pointer px-2  "
        style={{
          width: 130,
          borderBottomColor: colors.appNeutral100,
          borderBottomWidth: 1,
        }}
      >
        <Text className="text-base font-bold text-app-neutral-100">
          {t("profile:logout")}
        </Text>
        <Icon
          name="logout"
          width={16}
          height={16}
          color={colors.appNeutral100}
          className="absolute right-2 top-1"
        />
      </Box>
    </Box>
  );
};
