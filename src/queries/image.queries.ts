import { useMutation, useQuery } from "@tanstack/react-query";

import { CdnApi } from "@src/api/cdn-api";
import toast from "react-hot-toast";
import { parseError } from "@src/utils/error";
import { imagesService } from "@src/common/image/logic/ImagesService";
export const imageKeys = {
  image: (id:string) => ['image', id],
};
export function useGetImageQuery(imageId: string | undefined | null) {
  const keys: string[] = imageKeys.image(imageId as string);

  const query = useQuery({
    queryKey: keys,
    queryFn: () => imagesService.getFile(imageId as string),
    staleTime: 1 * 60 * 1000,
    enabled: imageId !== undefined && imageId !== "" && imageId !== null,
    retry: false,
  });

  return query;
}



export function useDeleteFile(options: { onSuccess: () => void }) {
  return useMutation({
    mutationFn: CdnApi.deleteFile,
    onSuccess: () => {
      options.onSuccess();
    },
    onError: (e) => {
      toast.error(parseError(e).message);
    },
  });
}
