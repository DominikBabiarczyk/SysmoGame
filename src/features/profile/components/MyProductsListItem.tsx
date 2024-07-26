import React, { useEffect } from "react";
import { Box, Text } from "@src/common/atoms";
import { Icon } from "@src/assets/Icon";
import { Product } from "@src/models/product";
import { cn } from "@src/styles/cn";
import { useT } from "@src/i18n/useTranslation";
import { ApiImage } from "@src/common/image/ApiImage";
import { useRouter } from "next/router";
import { handleShare } from "@src/utils/handleShare";
import { useTheme } from "@src/theme/theme";

export function MyProductsListItem({ item }: { item: Product }) {
  const { t } = useT();
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    console.log(item, "@");
  }, [item]);
  return (
    <Box className="mx-5 my-2 mt-4 flex-1">
      <Box
        style={{
          borderRadius: 15,
          border: "1px solid rgba(46, 46, 46, 0.10)",
          boxShadow: "0px 4px 4px 0px rgba(219, 194, 172, 0.35)",
        }}
      >
        <Box
          onClick={() => {
            router.push(`/products/${item.id}`);
          }}
          className="cursor-pointer"
        >
          <Box className="flex-1 flex-row justify-between rounded-2xl p-2">
            <Box className="flex-1 flex-row" style={{ gap: 10 }}>
              <ApiImage
                imageId={item.files[0]?.id}
                width={120}
                height={95}
                style={{
                  width: 120,
                  height: 95,
                  borderRadius: 15,
                  objectFit: "cover",
                }}
              />

              <Box className="w-4/5">
                <Text className="cursor-pointer text-base font-semibold text-app-neutral-300">
                  {item.title}
                </Text>
                <Text className="text-xs font-semibold text-primary-500">
                  {item.category.name}
                </Text>
                <Text className="mt-1 text-xs text-app-neutral-300">
                  {item.description}
                </Text>
                <Text className="mt-auto flex flex-row flex-wrap gap-2 text-xs text-app-neutral-300 opacity-50">
                  {item.keywords.map((el) => {
                    return <Box key={el}>{el}</Box>;
                  })}
                </Text>
              </Box>
            </Box>

            <Box className="max-w-[100px] flex-1 items-end justify-around">
              <Box
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  router.push(`/products/create?productId=${item.id}`);
                }}
                style={{
                  width: 30,
                  height: 30,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
                className="cursor-pointer"
              >
                <Icon
                  color={colors.appNeutral300}
                  name="edit"
                  width={18}
                  height={18}
                />
              </Box>
              <Box
                onClick={() => handleShare(`/products/${item.id}`, t)}
                className="cursor-pointer"
                style={{
                  width: 30,
                  height: 30,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Icon
                  color={colors.appNeutral300}
                  name="share"
                  width={18}
                  height={18}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
