import dayjs from "dayjs";
import i18next from "i18next";
import "dayjs/locale/en";
import "dayjs/locale/de";
import "dayjs/locale/fr";
import "dayjs/locale/it";
import { TFunction } from "i18next";

export namespace DateUtil {
  export function formatDate(date: any, format = "DD MMMM") {
    if (!date) {
      // @TODO change message
      return "NO_DATE";
    }
    const locale = i18next.language;
    const d = dayjs(date).locale(locale ?? 'de').format(format);
    return d;
  }

  export function formatDateFromNow(
    date: Date | null | undefined,
    t: TFunction,
  ) {
    if (!date) {
      return t("common:dates.justNow");
    }

    const now = dayjs();
    const inputDate = dayjs(date);

    const yearsDiff = now.diff(inputDate, "year");
    if (yearsDiff > 0) {
      return t(`common:dates.${yearsDiff === 1 ? "year" : "years"}`, {
        count: yearsDiff,
      });
    }

    const monthsDiff = now.diff(inputDate, "month");
    if (monthsDiff > 0) {
      return t(`common:dates.${monthsDiff === 1 ? "month" : "months"}`, {
        count: monthsDiff,
      });
    }

    const daysDiff = now.diff(inputDate, "day");
    if (daysDiff > 0) {
      return t(`common:dates.${daysDiff === 1 ? "day" : "days"}`, {
        count: daysDiff,
      });
    }

    const hoursDiff = now.diff(inputDate, "hour");
    if (hoursDiff > 0) {
      return t(`common:dates.${hoursDiff === 1 ? "hour" : "hours"}`, {
        count: hoursDiff,
      });
    }

    const minutesDiff = now.diff(inputDate, "minute");
    if (minutesDiff > 0) {
      return t(`common:dates.${minutesDiff === 1 ? "minute" : "minutes"}`, {
        count: minutesDiff,
      });
    }

    return t("common:dates.justNow");
  }
  export function displayChatDate(t: TFunction, dateString: string) {
    const locale = i18next.language;
    const date = dayjs(dateString).locale(locale);
    const nowNumber = dayjs().get("date");
    const dateNumber = date.get("date");
    if (dateNumber === nowNumber) {
      return date.format("hh:mm a");
    }
    const isYesterday = nowNumber - dateNumber === 1;

    if (isYesterday) {
      return t("common:yesterday");
    }
    return dayjs(dateString).format("DD MMMM");
  }
}
