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
	pager: (page: number) => void;
	tab: string;
	tag: string;
	tags: string[];
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

interface ITag {
	onClick?: SyntheticEvent;
}

interface ITagList {
	width?: string | number;
}

interface ITags {
	textTitle?: string;
	tags: Array<string>;
	onClickTag: (...arg) => void;
}
