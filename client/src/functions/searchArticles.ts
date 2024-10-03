export const SearchArticles = async (symbol: string, pageNumber: number) => {
  try {
    const response = await fetch('/tasks/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbol, pageNumber }),
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