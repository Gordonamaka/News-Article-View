export const AddArticles = async (date: string,
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
      body: JSON.stringify({ date, source, author, title, description, url, urlToImage }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    };

    const articles = await response.json();
    console.log(articles);
    return alert('Article Favourited! You can view your favourite articles in your profile.');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    };
  };
};