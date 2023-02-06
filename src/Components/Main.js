import React from 'react'
import styled from 'styled-components'
import { FcOldTimeCamera } from 'react-icons/fc';
import { FcVideoFile } from 'react-icons/fc';
import { FcGallery } from 'react-icons/fc';
import { GiNotebook } from 'react-icons/gi';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { FaPrayingHands } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';
import { FcShare } from 'react-icons/fc';
import { FiSend } from 'react-icons/fi';
import PostModal from "./PostModal"
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions/index"
import ReactPlayer from "react-player"

function main(props) {
	const [showModal, setShowModal] = useState("close");
	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	useEffect(() => {
		props.getArticles();
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) {
			return;
		}

		if (showModal === "close") {
			setShowModal("open");
			return;
		}

		if (showModal === "open") {
			setShowModal("close");
			return;
		}
	}
	return (
		<>
			{props.articles && props.articles.length === 0
				? <p>There are no articles yet</p> 
				: <Container >
		  <ShareBox>
		  	<div>
				  {props.user && props.user.photoURL
					  ? ( <img src={props.user.photoURL} alt='' /> )
						: ( <img src="/images/user.svg" alt='' /> )}
			  <button onClick={handleClick} disabled={props.loading ? true : false}>Start a post</button>
		 	</div>
		 	<div>
			  <button>
					  <FcOldTimeCamera style={style} />
				  <span>Photo</span>
			  </button>
			
			  <button>
				  <FcVideoFile style={style} />
				  <span>Video</span>
			  </button>
			  <button>
				  <FcGallery style={style} />
				  <span>Events</span>
			  </button>
			  <button>
				  <GiNotebook style={style} />
				  <span>Write Article</span>
			  </button>
			</div>
		  </ShareBox>
		  <Content>
				{props.loading && <img src='./images/Spin.svg' />}
						{ props.articles.length > 0 && props.articles.map((article, key) => (
							<Article key={key}>
								<SharedActor>
									<a>
										<img src={article.actor.image} alt='' />
										<div>
											<span>{article.actor.title}</span>
											<span>{article.actor.description}</span>
											<span>{article.actor.date.toDate().toLocaleDateString("en-US", options)}</span>
										</div>
									</a>
									<button>
										<AiOutlineEllipsis style={style} />
									</button>
								</SharedActor>
								<Description>
									{article.description}
								</Description>
								<SharedImg>
									<a>
										{!article.sharedImg && article.video
											? (<ReactPlayer width={"100%"} url={article.video} />)
											: (article.sharedImg && <img src={article.sharedImg} />)
										}
									</a>
								</SharedImg>
								<SocialCount>
									<li>
										<button>
											<AiFillLike style={style} />
											<FaPrayingHands style={style} />
											<span>75</span>
										</button>
									</li>
									<li>
										<button>
											<a>{article.comments}</a>
										</button>
									</li>
								</SocialCount>
								<SocilActions>
									<button>
										<AiOutlineLike style={style2} />
										<span>Like</span>
									</button>
									<button>
										<FaRegComments style={style2} />
										<span>Comments</span>
									</button>
									<button>
										<FcShare style={style2} />
										<span>Share</span>
									</button>
									<button>
										<FiSend style={style2} />
										<span>Send</span>
									</button>
								</SocilActions>
							</Article>
						))}
		 	</Content>
		  	<PostModal showModal={showModal} handleClick={handleClick} />
			</Container>
			}
</>
  	)
}

const Container = styled.div`
	grid-area: main;
`

const CommonCard = styled.div`
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 5px;
	position: relative;
	border: none;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`

const ShareBox = styled(CommonCard)`
	display: flex;
	flex-direction: column;
	color: #958b7b;
	margin: 0 0 8px;
	background: white;

	div {
		button {
			outline: none;
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
			line-height: 1.5;
			min-height: 48px;
			background: transparent;
			border: none;
			display: flex;
			align-items: center;
			font-weight: 600;
			padding-left: 16px;
		}

		&:first-child {
			padding: 8px 16px 0px 16px;
			display: flex;
			align-items: center;

			img {
				width: 48px;  
				border-radius: 50%;
			}

			button {
				padding-left: 16px;
				margin: 0 8px;
				flex-grow: 1;
				border: 1px solid rgba(0, 0, 0, 0.15);
				border-radius: 24px;
				background-color: white;
				text-align: left;
			}
		}

		&:nth-child(2) {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding: 5px 0 5px 0;

			button {
				cursor: pointer;
			}

			button:hover {
				background: rgba(0, 0, 0, .13);
				border-radius: 5px;
			}

			span {
				color: #70b5f9;
			}
		}
	}
`

const style = { fontSize: "1.5rem", margin: "0 4px 0 -2px " };

const style2 = { fontSize: "1.5rem", margin: "0 4px 0 -2px ", color: "#0a66c2", marginRight: "0" };

const Article = styled(CommonCard)`
	padding: 0;
	margin: 0 0 8px;
	overflow: visible;
`

const SharedActor = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 16px 0;
	margin-bottom: 8px;
	flex-wrap: nowrap;
	padding-right: 40px;

	a {
		margin-right: 12px;
		flex-grow: 1;
		overflow: hidden;
		display: flex;
		text-decoration: none;
		padding-bottom: 10px;

		img {
			width: 48px;
			height: 48px;
		}

		& > div {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			flex-basis: 0;
			margin-left: 8px;
			overflow: hidden;
			line-height: 1.5;
			span {
				text-align: left;
				&:first-child {
					font-size: 14px;
					font-weight: 700;
					color: rgba(0, 0, 0, 1);
				}

				&:nth-child(n+1) {
					font-size: 12px;
					color: rgba(0, 0, 0, 0.6)
				}
			}
		}
	}
	button {
		position: absolute;
		right: 12px;
		top: 0;
		background: transparent;
		border: none;
	}
`

const Description = styled.div`
	padding: 0 16px;
	overflow: hidden;
	color: rgba(0, 0, 0, 0.9);
	font-size: 14px;
	text-align: left;
`

const SharedImg = styled.div`
	margin-top: 8px;
	width: 100%;
	display: block;
	position: relative;
	background-color: #f9fafb;
	img {
		object-fit: cover;
		width: 100%;
		height: 450px;
	}
`

const SocialCount = styled.ul`
	list-style: none;
	line-height: 1.3;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	overflow: auto;
	margin: 0 16px;
	padding: 8px 0;
	border-bottom: 1px solid #e9e5df;

	li {	
		button {
		border: none;
		background: transparent;
		display: flex;
		align-items: center;
	}

	img {
		width: 30px;
		height: 30px;
		background: transparent;
		border: 0; 
		}
	}
	
`

const SocilActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 0;
	min-height: 40px;
	padding: 4px 8px;

	button {
		display: flex;
		align-items: center;
		padding: 8px;
		color: #0a66c0;
		border: none;
		background-color: white;

		
		@media (min-width: 768px) {
			span {
				margin-left: 8px;
			}
		}
	}
`

const Content = styled.div`
	text-align: center;
	& > img {
		width: 30px;
	}
`
const mapStateToProps = (state) => {
	return {
		loading: state.articleState.loading,
		user: state.userState.user,
		articles: state.articleState.articles,
	}
}

const mapDispatchToProps = (dispatch) => ({
	getArticles: () =>
		dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(main);
