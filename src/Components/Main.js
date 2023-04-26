import React from 'react'
import styled, {css} from 'styled-components'
import { FcOldTimeCamera } from 'react-icons/fc';
import { FcVideoFile } from 'react-icons/fc';
import { FcGallery } from 'react-icons/fc';
import { GiNotebook } from 'react-icons/gi';
import { AiOutlineEllipsis, AiOutlineLike } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';
import { HiShare } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';
import PostModal from "./PostModal"
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions/index"
import ReactPlayer from "react-player"

const Main = (props) => {
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
			{props.articles?.length === 0
				? <Preloader>
					<Loader />
				</Preloader> 
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
				{props.loading && <img src='/images/Spin.svg' />}
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
											? (<ReactPlayer controls width={"100%"} url={article.video} />)
											: (article.sharedImg && <img src={article.sharedImg} />)
										}
									</a>
								</SharedImg>
								<SocialCount>
									
								</SocialCount>
								<SocialActions>
									<button>
										<AiOutlineLike />
										<span>Like</span>
									</button>
									<button>
										<FaRegComments />
										<span>Comments</span>
									</button>
									<button>
										<HiShare />
										<span>Share</span>
									</button>
									<button>
										<FiSend />
										<span>Send</span>
									</button>
								</SocialActions>
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

			@media (max-width: 768px) {
				padding-left: 5px;
			}
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
	
`

const SocialActions = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin: 0;
	min-height: 40px;
	padding: 4px 8px;

	button {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 8px;
		color: #0a66c0;
		border: none;
		background-color: white;
		transition: 247ms;
		cursor: pointer;

		svg {
			color: #727272;
			font-Size: .8rem;

			@media (min-width: 881px) {
				font-size: 2rem;
			}
		}

		span {
			color: #a8a8a9;
			}

		&:hover {
			border-radius: 5px;
			background-color: rgba(0, 0, 0, 0.09);
		}
	}
`

const Content = styled.div`
	text-align: center;
	& > img {
		width: 30px;
	}
`

const Preloader = styled.div`
	display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Loader = styled.div`
	& {
		font-size: 10px;
		width: 1em;
		height: 1em;
		border-radius: 50%;
		position: relative;
		text-indent: -9999em;
		animation: mulShdSpin 1.1s infinite ease;
		transform: translateZ(0);
	}
	@keyframes mulShdSpin {
	0%,
	100% {
		box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.5), -1.8em -1.8em 0 0em rgba(255,255,255, 0.7);
	}
	12.5% {
		box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.5);
	}
	25% {
		box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.5), 1.8em -1.8em 0 0em rgba(255,255,255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
	}
	37.5% {
		box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.5), 2.5em 0em 0 0em rgba(255,255,255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
	}
	50% {
		box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.5), 1.75em 1.75em 0 0em rgba(255,255,255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
	}
	62.5% {
		box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.5), 0em 2.5em 0 0em rgba(255,255,255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
	}
	75% {
		box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.5), -1.8em 1.8em 0 0em rgba(255,255,255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
	}
	87.5% {
		box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.5), -2.6em 0em 0 0em rgba(255,255,255, 0.7), -1.8em -1.8em 0 0em #ffffff;
	}
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
