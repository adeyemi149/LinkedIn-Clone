import React from 'react'
import styled from 'styled-components'

const Rightside = () => {
  return (
	<Container>
		<Content>
			<FollowCard>
				  <Title>
					  <h2>Add to you feed</h2>
					  <img src='/images/feed-icon.svg' />
				  </Title>
				  <FeedList>
					  <li>
						  <a>
							  <Avatar />
						  </a>
						  <div>
							  <span>#Linkedin</span>
							  <button>Follow</button>
						  </div>
					  </li>
					  <li>
						  <a>
							  <Avatar />
						  </a>
						  <div>
							  <span>#Video</span>
							  <button>Follow</button>
						  </div>
					  </li>
				  </FeedList>
				  <Recommendation>
					  View all Recommendation
					  <img src='/images/right-icon.svg' />
				  </Recommendation>
			  </FollowCard>
			  <BannerCard>
				  <img src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg" />
			  </BannerCard>
		</Content>
	</Container>
  )
}

export default Rightside;


const Container = styled.div`
	grid-area: rightside;
`

const Content = styled.div`
	@media (min-width: 768px) {
		position: sticky;
		position: -webkit-sticky;
		position: -moz-sticky;
		position: -ms-sticky;
		position: -o-sticky;
		top: 54px;
	}
`

const FollowCard = styled.div`
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 5px;
	overflow: hidden;
	border: none;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
	padding: 12px;
`

const Title = styled.div`
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	font-size: 16px;
	width: 100%;
	color: rgba(0, 0, 0, 0.6);
`

const FeedList = styled.ul`
	margin-top: 16px;
	li {
		display: flex;
		align-items: center;
		margin: 12px 0;
		position: relative;
		font-size: 14px;

		& > div {
			display: flex;
			align-items: center;
			flex-direction: column;
		}

		button {
			background-color: transparent;
			color: rgba(0, 0, 0, 0.6);
			box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
			padding: 16px;
			align-items: center;
			border-radius: 15px;
			box-sizing: border-box;
			font-weight: 600;
			display: inline-flex;
			justify-content: center;
			max-height: 32px;
			max-width: 480px;
			text-align: center;
			outline: none;
		}
	}
`

const Avatar = styled.div`
	background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	width: 48px;
	height: 48px;
	margin-right: 8px;
`

const Recommendation = styled.a`
	color: #0a66c2;
	display: flex;
	align-items: center;
	font-size: 14px;
`

const BannerCard = styled(FollowCard)`
	img {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	/* @media (min-width: 768px) {
		position: sticky;
		position: -webkit-sticky;
		position: -moz-sticky;
		position: -ms-sticky;
		position: -o-sticky;
		top: 54px;
	} */
`

