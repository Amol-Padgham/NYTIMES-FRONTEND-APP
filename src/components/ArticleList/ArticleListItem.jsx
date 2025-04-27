import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleListItem = ({ article, selectedPeriod }) => {
  const navigate = useNavigate();
  const { id, title, abstract, byline, published_date, media } = article;
  const imageUrl = media?.[0]?.['media-metadata']?.[2]?.url;

  const openArticleDetail = () => {
    navigate(`/detail/${id}?period=${selectedPeriod}`);
  };

  return (
    <div
      onClick={openArticleDetail}
      className="article-card flex flex-col md:flex-row items-center md:items-start gap-6 p-6 mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
    >
      {imageUrl && (
        <div className="imgContainer">
          <img
            src={imageUrl}
            alt={title}
            className="article-image w-60 h-40 object-cover rounded-lg"
          />
        </div>
      )}
      <div className="article-content text-left flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-blue-600 hover:underline">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{abstract}</p>
        <div className="text-sm text-gray-500 mt-4 flex justify-between items-center">
          <span>{byline}</span>
          <span>{new Date(published_date).toLocaleDateString()}</span>
        </div>
        <div className="mt-6 readBtnContainer">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openArticleDetail();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full text-sm transition-all shadow-md"
            style={{ marginTop: '8px' }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleListItem;
