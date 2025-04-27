import React, { useState, useEffect } from 'react';
import ArticleListItem from './ArticleListItem';
import { fetchMostPopularArticles } from '../../api/nytimes';

const periods = [
  { label: 'Last 1 Day', value: 1 },
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 30 Days', value: 30 },
];

const ArticleList = ({ articles: initialArticles }) => {
  const [articles, setArticles] = useState(initialArticles || []);
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async (period) => {
    try {
      setLoading(true);
      const results = await fetchMostPopularArticles(period);
      setArticles(results);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (!initialArticles.length) {
    console.log(selectedPeriod);
      fetchArticles(selectedPeriod);
    // }
  }, [selectedPeriod]);

  const handlePeriodChange = async (value) => {
    setSelectedPeriod(value);
    await fetchArticles(value); // fetch immediately when user clicks
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-6">

      <h1 className="nyHeader text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8">
        📰 NY Times Trending Articles
      </h1>

      <div className="flex justify-center mb-10 gap-4">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => handlePeriodChange(period.value)}
            className={`px-5 py-2 rounded-full font-semibold transition-all ${
              selectedPeriod === period.value
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-2xl font-semibold animate-pulse">Loading Articles...</div>
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            // <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} selectedPeriod={selectedPeriod} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
