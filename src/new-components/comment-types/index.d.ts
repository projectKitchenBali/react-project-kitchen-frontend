export interface IUser {
	id: string;
	username: string;
	image: string;
}

export interface IComment {
	id: string;
	author: User;
	body: string;
	createdAt: Date;
}
