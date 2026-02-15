import axios from 'axios';

// Create an axios instance with a base URL matching the rewrite rule
export const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper for file uploads (multipart/form-data)
export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/documents', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// You can add more API methods here
export const getDocuments = async () => {
    const response = await api.get('/documents');
    return response.data;
};

export const deleteDocument = async (id: string) => {
    await api.delete(`/documents/${id}`);
};
