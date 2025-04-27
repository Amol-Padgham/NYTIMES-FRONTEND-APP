import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchMostPopularArticles } from '../api/nytimes';
import ArticleDetail from '../components/ArticleDetail/ArticleDetail';

const DetailPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [article, setArticle] = useState(null);
  const period = parseInt(searchParams.get('period')) || 1;

  useEffect(() => {
    async function loadArticle() {
      const data = await fetchMostPopularArticles(period);
      const found = data.find((a) => a.id === Number(id));
      setArticle(found);
    }
    loadArticle();
  }, [id, period]);

  return (
    <div>
      <ArticleDetail article={article} />
    </div>
  );
};

export default DetailPage;
