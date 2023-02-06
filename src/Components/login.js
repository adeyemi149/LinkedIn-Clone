import React from 'react'
import styled from 'styled-components'
import {connect} from "react-redux"
import { signInAPI } from "../actions/index"
import { Redirect } from 'react-router-dom'

const login = (props) => {
  return (
	  <Container>
		  {props.user && <Redirect to="/home"/>}
		<Nav>
			 <a href='/'>
				<img src="/images/login-logo.svg" alt=''/>
			 </a>
			 <div>
				<Join>Join Now</Join>
				<Signin onClick={() => props.signIn()}>Sign in</Signin>
			 </div>
		</Nav>
		<Section>
			<Hero>
				<h1>Welcome to your professional community</h1>
				<img src='/images/login-hero.svg' alt=''/>
			</Hero>
			<Form>
			<Google onClick={() => props.signIn()}>
				<img src='/images/google.svg' alt=''/>
				sign in with Google
			</Google>
			</Form>
		</Section>
	</Container>
  )
}


const Container = styled.div`
	
`

const Nav = styled.div`
	max-width: 1128px;
	margin: auto;
	padding: 12px 0 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;

	img {
		width: 135px;
		height: 34px;


		@media (max-width: 768px) {
			padding: 0 5px;
		}
	}
`

const Join = styled.a`
	font-size: 16px;
	padding: 10px 12px;
	color: rgba(0, 0, 0, 0.6);
	border-radius: 4px;
	margin-right: 12px;
	transition: all 167ms;
	cursor: pointer;
	flex-wrap: nowrap;

	@media (max-width: 376px) {
		display: none;
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
		color: rgba(0, 0, 0, 0.9);
	}
`

const Signin = styled.a`
	margin-right: 12px;
	box-shadow: inset 0 0 0 1px #0066c2;
	color: #0a66c2;
	border-radius: 24px;
	font-size: 16px;
	font-weight: 600;
	line-height: 40px;
	padding: 10px 24px;
	flex-wrap: nowrap;
	transition: 167ms;
	cursor: pointer;
	flex-wrap: nowrap;

	&:hover {
		background-color: rgba(112, 181, 249, 0.15);
		color: #0a66c2;
	}
`

const Section = styled.section`
	padding-top: 40px;
	padding-bottom: 138px;
	max-width: 1128px;
	margin: auto;
	flex-wrap: wrap;
	display: flex;
	align-content: start;
	align-items: center;
	min-height: 700px;
	width: 100%;

	@media (max-width: 768px) {
		min-height: 0px;
	}
`

const Hero = styled.div`
	width: 100%;

	h1 {
		padding-bottom: 0;
		font-size: 56px;
		width: 55%;
		color: #2977c9;
		font-weight: 200;
		line-height: 70px;

		@media (max-width: 768px) {
			font-size: 20px;
			text-align: center;
			width: 100%;
			line-height: 2;
		}
	
	}

	img {
		width: 700px;
		height: 670px;
		position: absolute;
		bottom: -160px;
		right: -150px;

		@media (max-width: 768px) {
			top: 230px;
			width: initial;
			position: initial;
			height: initial;
		}
	}
`

const Google = styled.div`
	display: flex;
	gap: 5px;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	height: 56px;
	width: 100%;
	border-radius: 28px;
	border: 2px solid black;
	box-shadow: 0px 20px 50px -10px rgba(0, 0, 0, 0.2);
	max-width: 300px;
	z-index: 0;
	transition: all 167ms;
	font-size: 18px;
	color: rgba(0, 0, 0, 0.6);
	cursor: pointer;

	@media (min-width: 768px) {
		max-width: 350px;
		margin: auto;
	}

	@media (max-width: 768px) {
		max-width: 450px;
		margin: auto;
	}

	&:hover {
		background-color:  rgba(207, 207, 207, 0.2);
		color: rgba(0, 0, 0, 0.85);
	}
`

const Form = styled.div`
	margin-top: 100px;
	width: 490px;
	
	@media (max-width: 768px) {
		margin-top: 20px;
		min-width: 100%;
		width: 200px;
	}

	@media (max-width: 959px) {
		width: 300px;
	}
`

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
}

const mapDispatchToProps = (dispatch) => ({
	signIn: () => dispatch(signInAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(login);