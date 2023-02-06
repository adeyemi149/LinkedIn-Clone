import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

function leftside(props) {
  return (
	<Container>
		<ArtCard>
			<UserInfo>
				<CardBackground />
					<a>
						<Photo />
					  <Link>Welcome, {props.user
						  ? props.user.displayName : "there"}!</Link>
					</a>
					<a>
						<AddPhotoText>Add a photo</AddPhotoText>
					</a>
			</UserInfo>
			<Widget>
					<a>
						<div>
						<span>Connections</span>
						<span>Grow your network</span>
						</div>
						<img src='/images/widget-icon.svg' />
					</a>
			</Widget>
			<Item>
				<span>
					<img src="/images/item-icon.svg" />
					<span>My Items</span>
				</span>
			</Item>
		</ArtCard>
		<CommunityCard>
			<a>
				<span>Groups</span>
			</a>
			<a>
				<span>Events
					<img src='/images/plus-icon.svg' />
				</span>
			</a>
			<a>
				<span>Follow Hashtags</span>
			</a>
			<a>
				<span>Discover more</span>
			</a>
		</CommunityCard>
	</Container>
  )
}


const Container = styled.div`
	position: fixed;
	grid-area: leftside;

	@media (max-width: 768px) {
		position: inherit;
	}
`

const ArtCard = styled.div`
	text-align: center;
	background-color: #fff;
	border-radius: 5px;
	overflow: hidden;
	margin-bottom: 8px;
	position: relative;
	border: none;
	transition: box-shadow 5s;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
	position: relative;
`

const UserInfo = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, .15);
	padding: 12px 12px 16px;
	word-wrap: break-word;
	word-break: break-word;

	a {
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
`
const CardBackground = styled.div`
	background: url("/images/card-bg.svg");
	background-position: center;
	background-size: 462px;
	height: 54px;
	margin: -12px -12px 0;
`

const Photo = styled.div`
	background-image: url("/images/photo.svg");
	height: 72px;
	width: 72px;
	box-sizing: border-box;
	background-clip: content-box;
	background-color: white;
	background-position: center;
	background-size: 60%;
	background-repeat: no-repeat;
	border: 2px solid white;
	margin: -38px auto 10px;
	border-radius: 50%;
`

const Link = styled.div`
	font-size: 16px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.9);
	font-weight: 600;
`

const AddPhotoText = styled.div`
	color: #0a66c2;
	font-weight: 400;
	margin-top: 4px;
	font-size: 12px;
	line-height: 1.33;
`

const Widget = styled.div`
	padding: 12px 12px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	transition-duration: 157ms;

	& > a {
		display: flex;
		justify-content: space-between;
		margin: 0 10px;
		text-align: left;
	}

	&:hover{
		background: rgba(0, 0, 0, 0.08)
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		span {
			font-size: 13px;
			line-height: 1.33;
			font-weight: 600;

			&:first-child {
				color: rgba(0, 0, 0, .6);
			}
			&:nth-child(2) {
				color: rgba(0, 0, 0, 1);
			}
		}
		
		
	}
	/* svg {
		color: rgba(0, 0, 0, 1);
	} */
`

const Item = styled.a`
	display: block;
	border-color: rgba(0, 0, 0, .8);
	padding: 20px;
	font-size: 12px;
	text-align: start;
	transition-duration: 157ms;

	span {
		display: flex;
		align-items: center;
		color: rgba(0, 0, 0, 1);
		font-weight: 600;
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
	}
`

const CommunityCard = styled(ArtCard)`
	display: flex;
	flex-direction: column;
	text-align: left;
	padding: 8px 0 0;

	a {
		padding: 4px 12px 6px 20px;
		font-size: 12px;
		span {
			display: flex;
			font-weight: 600;
			align-items: center;
			justify-content: space-between;
		}

		&:hover {
			color: #0a66c2;
		}

		&:last-child {
			border-top: 1px solid rgba(0, 0, 0, .8);
			padding: 12px 12px 12px 20px;
			color: rgba(0, 0, 0, .6);
			transition-duration: 157ms;

			&:hover {
				background: rgba(0, 0, 0, .08);
			}
		}
	}
	
`

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	}
}

export default connect(mapStateToProps)(leftside);