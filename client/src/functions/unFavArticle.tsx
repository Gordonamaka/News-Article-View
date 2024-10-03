export const UnfavouriteArticle = async (articleId:number) => {
  try {
    const response = await fetch(`/tasks/favourites/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete article with id ${articleId}: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error('Error in UnfavouriteArticle:', error);
    throw error;
  }
};
