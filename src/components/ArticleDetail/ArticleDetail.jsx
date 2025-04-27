
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleDetail = ({ article }) => {
  const navigate = useNavigate();

  if (!article) return null;

  const imageUrl = article?.media?.[0]?.['media-metadata']?.[2]?.url;

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-6 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-5xl w-full shadow-xl relative flex flex-col">
        
        <div className='closeBtn'>

        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white text-4xl font-bold z-10"
        >
          ×
        </button>
        </div>

        {imageUrl && (
          <div className="imgContainer p-6">
            <img
              src={imageUrl}
              alt={article.title}
              className="rounded-2xl w-full max-h-[400px] object-cover"
            />
          </div>
        )}

        <div className="article-content p-8">
          <div className="nyHeader mb-4 text-sm text-gray-500 dark:text-gray-400">
            {new Date(article.published_date).toLocaleDateString()} | {article.section}
          </div>

          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-center text-md text-gray-500 dark:text-gray-400 mb-4 italic">
            {article.byline}
          </p>

          <p className="text-gray-700 dark:text-gray-300 text-justify text-lg leading-relaxed mb-6">
            {article.abstract}
          </p>

          {article.adx_keywords && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {article.adx_keywords.split(';').map((keyword, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {keyword.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="readBtnContainer mt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transform transition duration-300"
            >
              Read Full Article
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArticleDetail;


