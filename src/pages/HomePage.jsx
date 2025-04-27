import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMostPopularArticles } from '../api/nytimes';
import ArticleList from '../components/ArticleList/ArticleList';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const period = parseInt(searchParams.get('period')) || 1;

  useEffect(() => {
    async function loadArticles() {
      const data = await fetchMostPopularArticles(period);
      setArticles(data);
    }
    loadArticles();
  }, [period]);

  const handlePeriodChange = (newPeriod) => {
    setSearchParams({ period: newPeriod }); 
  };

  return (
    <div>
      <ArticleList articles={articles} selectedPeriod={period} onPeriodChange={handlePeriodChange} />
    </div>
  );
};

export default HomePage;
