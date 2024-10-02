import axios from 'axios';
import { Readability } from '@mozilla/readability';

interface ArticleUrl {
  url: string; // Ensures article object must have a url property
}

export const FetchContent = async (article: ArticleUrl): Promise<string | null> => {
  try {
    // Request for Full Content of Article Details - Connected Via Proxy to avoid CORs
    const response = await axios.get(`/api/fetchArticleContent?url=${encodeURIComponent(article.url)}`);

    // We now have the article HTML, and we'll use DOMParser to convert it into a DOM object
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');

    // Pass the parsed DOM document into Readability to parse
    const content = new Readability(doc).parse();

    // The article content is in the textContent property as per NewsApi docs
    console.log('Logged Content',content?.textContent);
    return content?.textContent || null;
  } catch (error) {
    console.error('Error fetching article content:', error);
    return null;
  }
};
