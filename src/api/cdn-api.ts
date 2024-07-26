import { api } from './client';

export namespace CdnApi {
    export interface UploadFileRes {
        fileId: string;
    }
    export const uploadFile = async (file: File) => {
        const form = new FormData();
        form.append('file', file);

        try {
            const res = await api.post<UploadFileRes>('cdn/upload', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (error) {
            const res = await api.post<UploadFileRes>('cdn/upload', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        }
    };
    export const deleteFile = async (
        fileId: string,
    ): Promise<{ fileId: string }> => {
        await api.delete(`cdn/${fileId}`);
        return { fileId };
    };
    export const getFileBlob = async (imageId: string) => {
        const res = await api.get(`cdn/${imageId}`, {
          responseType: "blob",
        });
        return res.data;
      };
}
