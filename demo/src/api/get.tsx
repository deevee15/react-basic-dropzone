import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { AxiosError } from 'axios';

import api from '@/api/api';
//types
import { ApiResponse } from '@/shared/types/api-response';
import { UserData } from '@/shared/types/user/user-data';

type RequestData = Record<string, string | number>

export function useGetReq(){
    const navigate = useNavigate();

    const getReq = useCallback(
        async (endpoint: string, userData: UserData, params: RequestData = {}): Promise<ApiResponse> => {        
            try {
                const req = await api.get(endpoint, { params });
        
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
    
    return { getReq };
}
