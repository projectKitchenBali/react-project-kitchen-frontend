import ArticlePreview from "../article-preview/article-preview";
import ListPagination from "../../components/ListPagination";
import React from "react";

interface ArticleListProps {
    pager: (page?: number) => any;
    articles: TArticle[];
    loading?: boolean;
    articlesCount: number;
    currentPage: number;
}

const ArticleList: React.FC<ArticleListProps> = ({articles, articlesCount, currentPage, loading, pager}) => {

    if (!articles) {
        return <div className="article-preview">Загрузка ...</div>;
    }

    if (articles.length === 0) {
        return <div className="article-preview">Здесь нет статей... пока.</div>;
    }

    return (
        <div>
            {articles.map(article => <ArticlePreview article={article} key={article.slug}/>)}
            <ListPagination pager={pager} articlesCount={articlesCount} currentPage={currentPage}/>
        </div>
    )
};

export default ArticleList;
