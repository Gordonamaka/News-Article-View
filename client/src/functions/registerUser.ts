export const RegisterUser = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const response = await fetch('/tasks/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: `${firstName}`, lastName: `${lastName}`, email: `${email}`, password: `${password}` }),
    });

    if (response.status === 401) {
      return alert('All fields are required and cannot be empty. Please try again');
    }

    if (response.status === 200) {
      const data = await response.json();
      return alert(`Successfully registered ${data.firstName}! Please Login to save your favourite news articles!`);
    }

    throw new Error(`Response status: ${response.status}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return alert('An error occurred. Please try again.');
  }
};