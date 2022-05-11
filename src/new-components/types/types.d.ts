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
