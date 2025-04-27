import React, { useState, useEffect } from 'react';
import { fetchMostPopularArticles } from '../api/nytimes';
import ArticleList from '../components/ArticleList/ArticleList';

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function loadArticles() {
      const data = await fetchMostPopularArticles();
      setArticles(data);
    }
    loadArticles();
  }, []);

  return (
    <div>
      <h2>NY Times Most Popular Articles</h2>
      <ArticleList articles={articles} />
    </div>
  );
};

export default HomePage;
