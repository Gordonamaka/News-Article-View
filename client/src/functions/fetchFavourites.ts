export const FetchFavourites = async () => {
  try {
    const response = await fetch('/tasks/favourites/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const articles = await response.json();
    return articles;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    // If error return Empty Array
    return [];
  }
};