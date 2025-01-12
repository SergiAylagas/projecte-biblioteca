export const isAuthenticated = async (request: Request): Promise<boolean> => {
    const response = await fetch('http://localhost:8086/api/check-auth', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return data.isAuthenticated;
    }
  
    return false;
  };
  