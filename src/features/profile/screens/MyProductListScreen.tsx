import React from "react";
import { Box } from "@src/common/atoms";
import { colors } from "@src/styles/colors";
import { Icon } from "@src/assets/Icon";
import { useT } from "@src/i18n/useTranslation";
import { useRouter } from "next/router";
import { MyProductsList } from "../components/MyProductsList";
import { ProfileBackArrow } from "../components/ProfileBackArrow";
import { useCurrentUserQuery } from "@src/queries/user.queries";

interface ProductListScreenProps {}

export const MyProductListScreen = ({}: ProductListScreenProps) => {
  const { data: user } = useCurrentUserQuery();

  const router = useRouter();
  const { t } = useT();

  const ListHeader = (
    <Box onClick={() => router.push("/products/create")}>
      <Box className="relative mb-4 w-[265px] cursor-pointer self-center">
        <Box className="cursor-pointer rounded-[10px] border px-2 py-4 text-xs font-semibold text-app-neutral-300">
          {t("product:add-new-product")}
        </Box>
        <Box
          style={{
            width: 26,
            height: 26,
            borderRadius: 26,
            position: "absolute",
            right: 16,
            bottom: -6,
          }}
          className="cursor-pointer items-center justify-center bg-black "
        >
          <Icon width={20} height={20} name="plus" color={colors.white} />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box className="relative m-auto flex-1 bg-white sm:w-[500px] md:w-[700px] lg:w-[900px]">
      <ProfileBackArrow />

      <MyProductsList userId={user?.id!} ListHeader={ListHeader} />
    </Box>
  );
};
