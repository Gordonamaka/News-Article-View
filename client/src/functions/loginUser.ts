export const LoginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('/tasks/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: `${email}`, password: `${password}` }),
    });

    if (response.status === 401) {
      return alert('Incorrect username or password. Please try again.');
    }

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }

    throw new Error(`Response status: ${response.status}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return alert('An error occurred. Please try again.');
  }
};