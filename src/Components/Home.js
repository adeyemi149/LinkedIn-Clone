import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Header'
import Leftside from "./Left-side"
import Main from "./Main"
import Rightside from "./Right-side"

function Home(props) {
	console.log(props.user)
	return (
		<Container>
			{!props.user && <Redirect to="/" />}
		<Header />
		<Section>
			<h5>
				<a>Hiring in a hurry? -</a>
			</h5>
			<p>
				Find talented pros in record with upwork and keep business moving.
			</p>
		</Section>
		<Layout>
			<Leftside />
			<Main />
			<Rightside />
		</Layout>
	</Container>
  )
}


const Container = styled.div`
	padding-top: 56px;
`

const Section = styled.section`
	text-align: center;
	min-height: 50px;
	padding: 16px 0;
	box-sizing: cover;
	text-decoration: underline;
	display: flex;
	justify-content: center;

	h5 {
		color: #0a66c2;
	}

	a {
		font-weight: 700;
	}

	p {
		font-size: 14px;
		color: #434649;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0 5px;
	}
`
/*More Research on Grid */
const Layout = styled.div`
	display: grid;
	grid-template-areas: "leftside main rightside"; 
	grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
	column-gap: 25px;
	row-gap: 25px;
	/* grid-template-rows: auto; */
	margin: 15px 0;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		padding: 0 5px;
		min-height: 100vh;
	}
`

const mapStateToProps = (state) => ({
	user: state.userState.user
})

export default connect(mapStateToProps)(Home);