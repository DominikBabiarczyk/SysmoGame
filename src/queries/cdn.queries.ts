import {CdnApi} from '@src/api/cdn-api';
import {parseError} from '@src/utils/error';
import {toast} from '@src/utils/toast';
import {useMutation} from '@tanstack/react-query';

export function useUploadFileMutation(options: {
  onSuccess: (fileId: string) => void;
}) {
  const mutation = useMutation({
    mutationFn: CdnApi.uploadFile,
    onSuccess: res => options.onSuccess(res.fileId),
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}

export function useDeleteFileMutation(options: {
  onSuccess?: (fileId: string) => void;
  onMutate?: (fileId: string) => void;
}) {
  const mutation = useMutation({
    mutationFn: CdnApi.deleteFile,
    onMutate: fileId => options.onMutate?.(fileId),
    onSuccess: res => options.onSuccess?.(res.fileId),
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}
