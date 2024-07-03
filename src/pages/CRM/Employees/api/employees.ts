export const addEmployee = async (formData: FormData): Promise<Response> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/employees`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер:', error);
    throw error;
  }
};
