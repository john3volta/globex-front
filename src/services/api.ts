interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  position_name: string;
  department: string;
  hire_date: string;
}

interface ApiResponse {
  data: User[];
  success: boolean;
  error?: {
    message: string;
    code: number;
  };
}

const API_URL = 'http://localhost:3000';

export const getUsers = async (searchTerm?: string): Promise<User[]> => {
  const url = searchTerm ? `${API_URL}/?term=${searchTerm}` : API_URL;
  
  const response = await fetch(url);
  const data: ApiResponse = await response.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || 'Failed to fetch users');
  }
  
  return data.data;
}; 