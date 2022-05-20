import ArticleList from "../../article-list/article-list";
import React from "react";
import agent from "../../../agent";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_TAB} from "../../../constants/actionTypes";
import {Tab} from "../../tab/tab";
import cl from './main-view.module.css';

type onTabClick = (tab: string, pager: (page: number) => void, payload: ChangeTabPayload) => any;

interface ChangeTabPayload { // @todo: типизировать rootState
    articles: TArticle[];
    articlesCount: number;
}

/**
 * Вкладка Моя лента
 */

interface YourFeedTabProps {
    token?: string;
    tab: string;
    onTabClick: onTabClick;
}

const YourFeedTab: React.FC<YourFeedTabProps> = ({token, tab, onTabClick}) => {

    if (!token) {
        return null;
    }

    const clickHandler = () => {
        onTabClick("feed", agent.Articles.feed, agent.Articles.feed());
    };

    return (
        <Tab value="Ваша лента" active={tab === "feed"} onClick={clickHandler}>Ваша лента</Tab>
    )
};

/**
 * Вкладка вся лента
 */

interface GlobalFeedTabProps {
    tab: string;
    onTabClick: onTabClick;
}

const GlobalFeedTab: React.FC<GlobalFeedTabProps> = ({tab, onTabClick}) => {

    const clickHandler = () => {
        onTabClick("all", agent.Articles.all, agent.Articles.all());
    };

    return (
        <Tab value="Лента" active={tab === "all"} onClick={clickHandler}>Лента</Tab>
    )
};

/**
 * Вкладка фильтр по тэгу
 */

interface TagFilterTabProps {
    tag?: string;
}

const TagFilterTab: React.FC<TagFilterTabProps> = ({tag}) => {
    return tag ? (<Tab value={tag} active={true} onClick={() => null}>
        #{tag}
    </Tab>) : null;
};

/**
 * Страница
 */

const MainView: React.FC = () => {

    const dispatch = useDispatch();

    const state = useSelector<any, TArticleList>(state => state.articleList);
    const token = useSelector<any, string>(state => state.common.token)
    const tags = useSelector<any, string[]>(state => state.home.tags); // @todo: не используется?

    const onTabClick: onTabClick = (tab: string, pager: (page: number) => void, payload: ChangeTabPayload) => {
        dispatch({type: CHANGE_TAB, tab, pager, payload});
    };

    return (
        <div className="col-md-9">

            <div className={cl.tabs}>
                <YourFeedTab token={token} tab={state.tab} onTabClick={onTabClick}/>
                <GlobalFeedTab tab={state.tab} onTabClick={onTabClick}/>
                <TagFilterTab tag={state.tag}/>
            </div>

            <ArticleList pager={state.pager} articles={state.articles} articlesCount={state.articlesCount} currentPage={state.currentPage}/>
        </div>
    )
};

export default MainView;
