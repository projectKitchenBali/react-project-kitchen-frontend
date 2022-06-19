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

// createdAt: string;
// updatedAt: string;

type TUser = {
	username: string;
	image: string;
	following: boolean;
};

type TArticleList = {
	articles: TArticle[];
	articlesCount: number;
	currentPage: number;
	pager: (page: number) => Omit<TArticleList, "articles" | "articlesCount">;
	tab: string;
	tag: string;
	tags: string[];
};

type TCurrentUser = {
	username: string;
	email: string;
	image: string;
	bio: string;
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
type TAuthForm = {
	email: string;
	password: string;
	inProgress: boolean;
	errors: {
		[error: string]: string;
	};
};

/**
 * Тип для формы регистрации и т.д.
 */
type RegisterForm = {
	inProgress: boolean;
	errors: {
		[error: string]: string;
	};
};

// Общий тип для ошибок, которые приходят с api
type TErrors = {
	[error: string]: string;
};
