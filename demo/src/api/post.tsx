import { RefObject, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

import { AxiosError, AxiosProgressEvent } from 'axios';

import api from '@/api/api';
//types
import { ApiResponse } from '@/shared/types/api-response';
type FormDataValue = File[] | Blob | string | File;
type PostData = Record<string, FormDataValue>;

export function usePostReq(){
    const navigate = useNavigate();

    const postReq = useCallback(
        async (
            endpoint: string, 
            postData: PostData, 
            progressValueCb?: (val: number) => void, 
            abortController?: RefObject<AbortController | null>
          ): Promise<ApiResponse> => {
          const body = new FormData();
      
          Object.entries(postData).forEach(([key, value]: [string, FormDataValue]) => {
            if(Array.isArray(value)) { (value as File[]).forEach(file => body.append(`${key}[]`, file)); }
            else if(value instanceof File || value instanceof Blob) body.append(key, value);
            else if(typeof value === 'number' || typeof value === 'boolean') body.append(key, String(value));
            else body.append(key, value);
          });
    
          try {
            const req = await api.post(endpoint, body, {
              signal: abortController?.current?.signal,
              onUploadProgress: (event: AxiosProgressEvent) => {
                if(event.total && progressValueCb) {
                  const current: number = Math.round((event.loaded / event.total) * 100) || 0
                  progressValueCb(current)
                }
              }
            });
    
            return req.data;
          } 
          catch (err: unknown) {
            const axiosErr = err as AxiosError

            if (axiosErr.code === 'ERR_CANCELED' || axiosErr.message?.includes('canceled') || (err instanceof DOMException && err.name === 'AbortError')) {
              throw err;
            }

            if (axiosErr.response?.status === 401) {
              navigate('/login');
              throw new Error('Unauthorized');
            }
            return { error: 'request error', data: {} };
          }
        },
        [navigate]
      );
    
    return { postReq };
}