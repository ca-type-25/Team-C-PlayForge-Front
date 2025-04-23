import React, { createContext, useContext, useState, ReactNode } from 'react';


export interface Article {
  _id: string;
  title: string;
  content: string;
  image?: string;
  video?: string;
  users: string[];
  subjects: string[];
  createdAt?: Date;
  updatedAt?: Date;
}


interface ArticleContextState {
  article: Article | null;
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  setArticle: (article: Article | null) => void;
  setArticles: (articles: Article[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateArticle: (data: Partial<Article>) => void;
  clearArticle: () => void;
}


const ArticleContext = createContext<ArticleContextState>({
  article: null,
  articles: [],
  isLoading: false,
  error: null,
  setArticle: () => {},
  setArticles: () => {},
  setIsLoading: () => {},
  setError: () => {},
  updateArticle: () => {},
  clearArticle: () => {}
});


interface ArticleProviderProps {
  children: ReactNode;
}

export const ArticleProvider: React.FC<ArticleProviderProps> = ({ children }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateArticle = (data: Partial<Article>) => {
    setArticle(prev => prev ? { ...prev, ...data } : null);
  };

  const clearArticle = () => {
    setArticle(null);
    setError(null);
    setIsLoading(false);
  };

  const value = {
    article,
    articles,
    isLoading,
    error,
    setArticle,
    setArticles,
    setIsLoading,
    setError,
    updateArticle,
    clearArticle
  };

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
};


export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticle must be used within an ArticleProvider');
  }
  return context;
};

export default ArticleContext;