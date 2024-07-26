import React from "react";
import { useT } from "@src/i18n/useTranslation";
import { useRouter } from "next/router";
import { Icon } from "@src/assets/Icon";
import { useTheme } from "@src/theme/theme";
import { Box } from "@src/common/atoms";

export const ProfileBackArrow = () => {
  const { t } = useT();
  const router = useRouter();
  const {colors} = useTheme()
  return (
    <Box
      onClick={() => router.back()}
      className="absolute left-2 top-0 flex cursor-pointer items-center gap-2 font-semibold "
    >
      <Icon color={colors.appNeutral300} name="back" width={20} height={20} />
      {t("common:btn.back")}
    </Box>
  );
};
