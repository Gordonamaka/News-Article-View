export const AddArticles = async (publishedAt: string,
  source: string,
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,) => {
  try {
    const response = await fetch('/tasks/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publishedAt, source, author, title, description, url, urlToImage }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    };

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    };
  };
};