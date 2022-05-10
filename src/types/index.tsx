export type User = {
	id: string;
	username: string;
	image: string;
};

export type Comment = {
	id: string;
	author: User;
	body: string;
	createdAt: Date;
};
