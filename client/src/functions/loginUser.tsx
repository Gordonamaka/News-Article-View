export const LoginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('/tasks/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: `${email}`, password: `${password}` }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else if (response.status === 200) {
      console.log('Successfully Logged in!')
      // Do something? Put search or logged in search another page?
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return console.log('An Error occurred.')
  }
};