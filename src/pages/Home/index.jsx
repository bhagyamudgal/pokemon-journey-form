import React from "react";
import styled from "styled-components";
import Form from "../../components/Form";

function Home() {
	return (
		<Container>
			<Form />
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	padding: 5rem 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default Home;
