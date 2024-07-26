import React from "react";
import dots from "./Svg/dots.svg";
import user from "./Svg/user.svg";
import arrow from "./Svg/arrow.svg";
import alert from "./Svg/alert.svg";
import logout from "./Svg/logout.svg";
import group from "./Svg/group.svg";
import envelope from "./Svg/envelope.svg";
import title from "./Svg/title.svg";
import close from "./Svg/close.svg";
import imageplaceholder from "./Svg/image-placeholder.svg";
import back from "./Svg/back.svg";
import trash from "./Svg/trash.svg";
import edit from "./Svg/edit.svg";
import clock from "./Svg/clock.svg";
import share from "./Svg/share.svg";
import remove from "./Svg/remove.svg";
import magnifier from "./Svg/magnifier.svg";
import filter from "./Svg/filter.svg";
import photo from "./Svg/photo.svg";
import heart from "./Svg/heart.svg";
import visibilityon from "./Svg/visibility-on.svg";
import visibilityoff from "./Svg/visibility-off.svg";
import asterisk from "./Svg/asterisk.svg";
import plus from "./Svg/plus.svg";

const ICONS = {
  dots,
  user,
  arrow,
  alert,
  logout,
  group,
  envelope,
  title,
  close,
  imageplaceholder,
  back,
  trash,
  edit,
  clock,
  share,
  remove,
  magnifier,
  filter,
  photo,
  heart,
  visibilityon,
  visibilityoff,
  asterisk,
  plus,
};

export type IconType = keyof typeof ICONS;

interface IconProps {
  name: IconType;
  className?: string;
  color?: string;
  width: string | number;
  height: string | number;
}

const AppIcon = ({ name, ...props }: IconProps) => {
  const CurrentIcon = ICONS[name];
  return <CurrentIcon {...props} />;
};

export const Icon = React.memo(AppIcon);
