import { useRef, useState } from 'react';
import axios from 'axios';

export const useHttpRequest = (baseHttpUrl) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const controller = useRef(new AbortController());
  
    const sendRequest = async ({
      url,
      method,
      body = null,
      params = null,
      baseUrl = '',
    }) => {
      setLoading(true);
      setProgress(0);
  
      controller.current = new AbortController();
      let response = null;
      const token = localStorage.getItem("token");
  
      try {
        response = await axios.request({
          baseURL: baseHttpUrl ? baseHttpUrl : baseUrl,
          url: url,
          timeout: 0,
          method: method,
          params: params,
          data: body,
          signal: controller.current.signal,
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
      return response ? response.data : null;
    };
  
    return { sendRequest, error, loading, progress };
  };
  
