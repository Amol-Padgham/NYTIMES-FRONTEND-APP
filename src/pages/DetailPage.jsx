import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMostPopularArticles } from '../api/nytimes';
import ArticleDetail from '../components/ArticleDetail/ArticleDetail';

const DetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function loadArticle() {
      const data = await fetchMostPopularArticles();
      const found = data.find(a => a.id === Number(id));
      setArticle(found);
    }
    loadArticle();
  }, [id]);

  return (
    <div>
      <ArticleDetail article={article} />
    </div>
  );
};

export default DetailPage;
