export const AddArticles = async (id: string) => {
  try {
    const response = await fetch('/users/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    };

    const articles = await response.json();
    console.log(articles);
    return articles;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    };
  };
};