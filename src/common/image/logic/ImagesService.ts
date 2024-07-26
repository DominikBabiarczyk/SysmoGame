import { CdnApi } from "@src/api/cdn-api";

class ImagesService {
  public async getFile(id: string) {
    const res = await CdnApi.getFileBlob(id);
    return URL.createObjectURL(res);
  }
}

export const imagesService = new ImagesService();
