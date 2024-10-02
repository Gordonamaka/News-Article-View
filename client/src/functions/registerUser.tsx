export const RegisterUser = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const response = await fetch('/tasks/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: `${firstName}`, lastName: `${lastName}`, email: `${email}`, password: `${password}` }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else if (response.status === 200) {
      console.log('Successfully Registered User...')
      // Do something? Log in Registered User 
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