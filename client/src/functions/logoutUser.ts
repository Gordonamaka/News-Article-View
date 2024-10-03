export const LogoutUser = async () => {
  try {
    const response = await fetch('/tasks/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Logout failed with status: ${response.status}`);
    }
    console.log('Successfully logged out!');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};