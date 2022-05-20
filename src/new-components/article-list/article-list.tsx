import React from "react";
import ArticlePreview from "../article-preview/article-preview";
import ListPagination from "../list-pagination/list-pagination";
import cl from './article-list.module.css';

interface ArticleListProps {
    pager: (page: number) => void;
    articles: TArticle[];
    articlesCount: number;
    currentPage: number;
}

const ArticleList: React.FC<ArticleListProps> = ({articles, articlesCount, currentPage, pager}) => {

    if (!articles) {
        return <div className={cl.block}>Загрузка ...</div>;
    }

    if (articles.length === 0) {
        return <div className={cl.block}>Здесь пусто... пока что.</div>;
    }

    return (
        <div>
            {articles.map(article => <ArticlePreview article={article} key={article.slug}/>)}
            <ListPagination pager={pager} articlesCount={articlesCount} currentPage={currentPage}/>
        </div>
    )
};

export default ArticleList;
