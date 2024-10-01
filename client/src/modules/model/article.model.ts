interface Source {
  id: any; // May need to be a number for DB connection.
  name: string;
}

export interface Article {
  source: Source;
  title: string;
  author: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}