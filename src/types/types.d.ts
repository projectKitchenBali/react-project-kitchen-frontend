type TArticle = {
	author: TUser;
	slug: string;
	title: string;
	description: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
	tagList: string[];
	favorited: boolean;
	favoritesCount: number;
	media?: string;
};

type TUser = {
	username: string;
	image: string;
	following: boolean;
};
type TArticleList = {
	articles: TArticle[];
	articlesCount: number;
	currentPage: number;
	pager?: (page: number) => void;
};
type TCurrentUser = {
	username: string;
	email: string;
	image: string;
};

type TComment = {
	id: string;
	author: TUser;
	body: string;
	createdAt: Date;
};

/**
 * Тип для формы входа и т.д.
 */
type AuthForm = {
	email: string;
	password: string;
	inProgress: boolean;
	errors: {
		[error: string]: string;
	};
};
