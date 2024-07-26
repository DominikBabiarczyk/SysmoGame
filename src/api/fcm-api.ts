import {api} from '@src/api/client';

export namespace FcmApi {
  export const addFcmToken = async (token: string) => {
    const res = await api.post('fcm-tokens', {token});
    return res.data;
  };
}
