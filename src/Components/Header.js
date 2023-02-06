import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {signOutAPI} from "../actions"

function Header(props) {
  return (
	<Container>
		<Content>
			<Logo>
				<a href='/'>
				<img src='/images/home-logo.svg' />
				</a>
			</Logo>
			<Search>
				<div>
					<input type="text" placeholder="Search" />
					<SearchIcon>
					<img src='/images/search-icon.svg' />
					</SearchIcon>
				</div>
			</Search>
			<Nav>
				<NavListWrap>
					<NavList className='active'>
						<a>
							<img src='/images/nav-home.svg' />
							<span>Home</span>
						</a>
					</NavList>
					<NavList>
						<a>
							<img src='/images/nav-network.svg' />
							<span>My Network</span>
						</a>
					</NavList>
					<NavList>
						<a>
							<img src='/images/nav-jobs.svg' />
							<span>Jobs</span>
						</a>
					</NavList>
					<NavList>
						<a>
							<img src='/images/nav-messaging.svg' />
							<span>Messaging</span>
						</a>
					</NavList>
					<NavList>
						<a>
							<img src='/images/nav-notifications.svg' />
							<span>Notifications</span>
						</a>
					</NavList>
					<User>
						<a>
							{props.user && props.user.photoURL
								  ? (<img src={props.user.photoURL} alt=""/>)
								  : (<img src='/images/user.svg' alt=""/>)}
							<span>
								  <img src='/images/down-icon.svg' />
							</span>
						</a>
						<Signout onClick={() => props.signOut()}>
							<a>Sign Out</a>
						</Signout>
					</User>
					<Work>
						<a>
							<img src='/images/nav-work.svg' />
							<span>
								Work
								<img src='/images/down-icon.svg' />
							</span>
						</a>
					</Work>
				</NavListWrap>
			</Nav>
		</Content>
	</Container>
  )
}

const Container = styled.div`
	background-color: white;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	z-index: 100;
	padding: 0 24px;
`

const Content = styled.div`
	display: flex;
	align-items: center;
	max-width: 1128px;
	margin: 0 auto;
	min-height: 100%;
`

const Logo = styled.span`
	margin-right: 8px;
	font-size: 0px;
`

const Search = styled.div`
	opacity: 1;
	position: relative;
	flex-grow: 1;

	& > div {
		max-width: 280px;
		input {
			border: none;
			background-color: #eef3f8;
			width: 218px;
			color: rgba(0, 0, 0, 0.9);
			border-radius: 2px;
			padding: 0 8px 0 40px;
			line-height: 1.75;
			font-weight: 400;
			font-size: 14px;
			height: 34px;
			border-color: #dce6f1;
			vertical-align: text-top;
			outline-color: rgba(112, 181, 249);
		}
	}
`

const SearchIcon = styled.div`
	width: 40px;
	position: absolute;
	top: 10px;
	left: 2px;
	z-index: 1;
	pointer-events: none;
	display: flex;
	justify-content: center;
 `

 const Nav = styled.nav`
	margin-left: auto;
	display: block;

	@media (max-width: 768px) {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: white;
	}
 `

const NavListWrap =styled.ul`
	flex-wrap: nowrap;
	list-style-type: none;
	display: flex;

	.active {
		span:after {
			content: "";
			transform: scaleX(1);
			border-bottom: 2px solid var(--white, #fff);
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			border-color: rgba(0, 0, 0, 0.9);
			transition: transform .2s;
		}
 	}
`

 const NavList = styled.li`
	display: flex;
	align-items: center;

	a {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;
		min-height: 52px;
		min-width: 80px;
		position: relative;
		text-decoration: none;

		span {
			color: rgba(0, 0, 0, 0.6);
			display: flex;
			align-items: center;
		}

		@media (max-width: 768px) {
			min-width: 70px;
		}

		&:hover, &:active {
				span {
					color: rgba(0, 0, 0, 0.9);
					cursor: pointer;
				}
		}
	}
 `

const Signout = styled.div`
	position: absolute;
	top: 45px;
	background-color: white;
	border-radius: 0 0 10px 10px;
	width: 100px;
	height: 40px;
	font-size: 16px;
	transition-duration: 257ms;
	text-align: center;
	opacity: 0;
	cursor: pointer;
`

const User = styled(NavList)`
	a > img {
		width: 34px;
		border-radius: 50%;
	}

	span {
		display: flex;
		align-items: center;
	}

	&:hover {
		${Signout} {
			opacity: 1;
		}
	}
`

const Work = styled(User)`
	border-left: 2px solid rgba(0, 0, 0, 0.08);
`

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
}

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOutAPI())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);