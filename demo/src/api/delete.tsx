import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { AxiosError } from 'axios';

import api from '@/api/api';
//types
import { ApiResponse } from '@/shared/types/api-response';
type BodyDataProps = Record<string, (string | number[])>

export function useDeleteReq(){
    const navigate = useNavigate();

    const deleteReq = useCallback(
        async (endpoint: string, bodyData?: BodyDataProps): Promise<ApiResponse> => {
            try {
                const req = await api.delete(endpoint, {
                    data: bodyData
                });
        
                return req.data;
            } 
            catch (err) {
                const axiosErr = err as AxiosError
                if (axiosErr.response?.status === 401) {
                    navigate('/login');
                    throw new Error('Unauthorized');
                }
                return { error: 'request error', data: {} };
            }
        }, 
    [navigate]);
    
    return { deleteReq };
}
