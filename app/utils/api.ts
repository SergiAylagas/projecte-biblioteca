const API_BASE_URL = "http://localhost:8086/api"; // Asegúrate de que esta URL sea correcta

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "GET",
      credentials: "include", // Permite el uso de cookies de sesión
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const postData = async (endpoint: string, data: object) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Necesario para autenticación
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};