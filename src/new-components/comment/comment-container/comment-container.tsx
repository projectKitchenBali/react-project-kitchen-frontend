import CommentInput from "../comment-input/comment-input";
import CommentList from "../comment-list/comment-list";
import { Link } from "react-router-dom";
import { FC } from "react";
import ListErrors from "../../../components/ListErrors";
import Button from "../../button/button";
import styles from "./comment-container.module.css";

type CommentListProps = {
	comments: TComment[];
	currentUser: TUser;
	slug: string;
	errors: Array<string>;
};

const CommentContainer: FC<CommentListProps> = ({
	currentUser,
	comments,
	slug,
	errors,
}) => {
	if (currentUser) {
		return (
			<div className="col-xs-12 col-md-8 offset-md-2">
				<div>
					<ListErrors errors={errors}></ListErrors>
					<CommentInput slug={slug} currentUser={currentUser} />
				</div>

				<CommentList
					comments={comments}
					slug={slug}
					currentUser={currentUser}
				/>
			</div>
		);
	} else {
		return (
			<div className="col-xs-12 col-md-8 offset-md-2">
				<p>
					<Link to="/login">
						<Button>Войдите</Button>
					</Link>
					&nbsp;или&nbsp;
					<Link to="/register">
						{" "}
						<Button>зарегистрируйтесь</Button>
					</Link>
					&nbsp;чтобы добавлять комментарии
				</p>
				<p className={`${styles.header} text_type_main-headline hedaer`}>
					Комментарии
				</p>
				<CommentList
					comments={comments}
					slug={slug}
					currentUser={currentUser}
				/>
			</div>
		);
	}
};

export default CommentContainer;
