import React from "react";
import { useCurrentUserQuery } from "@src/queries/user.queries";
import { NoData } from "@src/common/ui/NoData";
import { ErrorInformation } from "@src/common/ui/ErrorInformation";
import { Profile } from "../components/Profile";
import { SpinnerWrapped } from "@src/common/ui/SpinnerWrapped";

export const UserProfileScreen = () => {
  const { data: user, isLoading, isError, error } = useCurrentUserQuery();

  if (isLoading) {
    return <SpinnerWrapped />;
  }
  if (isError) {
    return <ErrorInformation error={error} />;
  }
  if (!user) {
    return <NoData textClassName="text-center" />;
  }

  return <Profile user={user} />;
};
