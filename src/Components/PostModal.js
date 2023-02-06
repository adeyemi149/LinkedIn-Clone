import firebase from 'firebase/compat/app';
import { FcAddImage } from 'react-icons/fc';
import { FcVideoFile } from 'react-icons/fc';
import { FcComments } from 'react-icons/fc';
import { GrClose } from 'react-icons/gr';
import styled from "styled-components"
import ReactPlayer from 'react-player';
import { useState } from "react";
import { connect } from 'react-redux';
import React from 'react'
import {postArticleAPI} from "../actions"

function PostModal(props) {
	const [editorText, setEditorText] = useState("");
	const [shareImg, setShareImage] = useState("");
	const [videolink, setVideoLink] = useState("");
	const [assetArea, setAssetArea] = useState("");

	const handleChange = (e) => {
		const image = e.target.files[0];

		if (image === "" || image === undefined) {
			alert(`not an image, the file is a ${typeof image}`)
			return;
		} 

		setShareImage(image);
	}

	const reset = (e) => {
		setEditorText("");
		setShareImage("");
		setVideoLink("");
		setAssetArea("");
		props.handleClick(e);
	}

	const switchAssetArea = (area) => {
		setShareImage("");
		setVideoLink("");
		setAssetArea(area);
	}

	const postArticle = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) {
			return;
		}

		const payload = {
			image: shareImg,
			video: videolink,
			user: props.user,
			description: editorText,
			timestamp: firebase.firestore.Timestamp.now(),
		}
		props.postArticle(payload);
		reset(e);
	}


	return (
		<>
			{ props.showModal === "open" &&
				<Container>
					<Content>
						<Header>
							<h2>Create a post</h2>
							<button onClick={(e) => reset(e)}>
								<GrClose />
							</button>
						</Header>
						<SharedContent>
							<UserInfo>
								{
									props.user.photoURL ? (
										<img src={props.user.photoURL} alt=''/>
									) : (
										<img src='/images/user.svg' alt='' />
									)
								}
								<span>{props.user.displayName}</span>
							</UserInfo>
							<Editor> 
								<textarea
									value={editorText}
									placeholder="What do you want to talk about ?"
									onChange={(e) => setEditorText(e.target.value)}
									autoFocus={true}
								/>
								{assetArea === "image" ?
								<UploadImage>
									<input
										type="file"
										accept='image/gif, image/jpeg, image/png'
										name="image"
										id='file'
										style={{display: 'none'}}
										onChange={handleChange}
									/>
									<p>
										<label htmlFor='file'>Select an image</label>
									</p>
									{shareImg && <img src={URL.createObjectURL(shareImg)} />}
								</UploadImage>
								: assetArea === "media" &&
									(<>
										<input
											type="text"
											placeholder="Please input a video link"
											value={videolink}
											onChange={(e) => setVideoLink(e.target.value)}
										/>
										{videolink &&
											(<ReactPlayer width={"100%"} url={videolink} />)}
									</>)
								}
							</Editor>
						</SharedContent>
						<SharedCreation>
							<AttachAssests>
								<AssestButton onClick={() => switchAssetArea("image")}>
									<FcAddImage style={style} />
								</AssestButton>
								<AssestButton onClick={() => switchAssetArea("media")}>
									<FcVideoFile style={style} />
								</AssestButton>
							</AttachAssests>
							<SharedComment>
								<AssestButton>
									<FcComments style={style} />
									Anyone
								</AssestButton>
							</SharedComment>
							<PostButton
								disabled={!editorText ? true : false}
								onClick={(e) => postArticle(e)} >
								Post
							</PostButton>
						</SharedCreation>
					</Content>
				</Container>
			}
		</>
  )
}

const style = {
	fontSize: "1.5rem"
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	color: black;
	background: rgba(0, 0, 0, 0.8);
`

const Content = styled.div`
	width: 100%;
	max-height: 90%;
	max-width: 552px;
	background-color: white;
	overflow: initial;
	border-radius: 5px;
	position: relative;
	top: 32px;
	display: flex;
	flex-direction: column;
	margin: 0 auto; 
	animation: fadeIn 0.4s;
`

const Header = styled.div`
	padding: 16px 20px;
	color: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 400;
	border-bottom: 1px solid rgba(0, 0, 0, .15);
	line-height: 1.5;

	button {
		height: 45px;
		width: 45px;
		min-width: auto;
		color: rgba(0, 0, 0, .15);
		border: none;
		background-color: rgba(0, 0, 0, 0.35);
	}
`

const SharedContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-y: auto;
	vertical-align: baseline;
	background: transparent;
	padding: 8px 12px;
`

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 24px;

	img {
		width: 48px;
		height: 48px;
		border: 2px solid transparent;
		border-radius: 50%;
	}

	span {
		font-weight: 600;
		font-size: 16px;
		line-height: 1.5;
		margin-left: 5px;
	}
`

const SharedCreation = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 12px 24px 12px 16px;
`

const AttachAssests = styled.div`
	display: flex;
	align-items: center;
	padding-right: 8px;

	${AssestButton} {
		width: 48px;
	}
`

const AssestButton = styled.button`
	display: flex;
	align-items: center;
	height: 40px;
	min-width: auto;
	color: rgba(0, 0, 0, .5);
`

const SharedComment = styled.div`
	padding-left: 8px;
	margin-right: auto;
	margin-left: 31px;
	border-left: 1px solid rgba(0, 0, 0, .15);
	${FcComments} {
		margin-right: 5px;
	}
`

const PostButton = styled.button`
	min-width: 60px;
	border-radius: 20px;
	padding-left: 16px;
	padding-right: 16px;
	background: ${props => (props.disabled ? "rgba(0, 0, 0, 0.55)" : "#0a66c2")};
	color: whitesmoke;
	&:hover {
		background: ${props => (props.disabled ? "rgba(0, 0, 0, 0.55)" : "#004182")};
	}
`

const Editor = styled.div`
	padding: 12px 24px;

	textarea {
		width: 100%;
		min-height: 100px;
		resize: none;
	}

	input {
		width: 100%;
		height: 35px;
		font-size: 16px;
		margin-bottom: 20px;
	}
`

const UploadImage = styled.div`
	text-align: center;

	img {
		width: 100%;
		height: 50vh;
		object-fit: cover;
	}
`
const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	}
}

const mapDispatchToProps = (dispatch) => ({
	postArticle: (payload) => 
		dispatch(postArticleAPI(payload)),
	
})

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);