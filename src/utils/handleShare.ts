import { TFunction } from "next-i18next";
import { toast } from "./toast";

export const handleShare = (link: string, t: TFunction) => {
  try {
    navigator.clipboard.writeText(window.location.origin + link);
    toast.success(t("common:link-copied"));
  } catch (e) {
    toast.error(t("common:could-not-copy-link"));
  }
};
