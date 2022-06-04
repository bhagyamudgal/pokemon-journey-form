import React from "react";
import styled from "styled-components";
import Form from "../../components/Form";

function Home() {
	return (
		<Container>
			<Form />

			<Footer>
				<p>
					Developed By{" "}
					<a
						href="http://www.bhagyamudgal.me"
						target="_blank"
						rel="noopener noreferrer"
					>
						Bhagya Mudgal
					</a>
				</p>
			</Footer>
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	padding: 5rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Footer = styled.footer`
	margin-top: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;

	p {
		color: ${(props) => props.theme.palette.light.main};

		a {
			color: ${(props) => props.theme.palette.primary.main};
		}
	}
`;

export default Home;
