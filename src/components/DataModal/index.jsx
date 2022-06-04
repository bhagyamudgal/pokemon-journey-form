import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FieldContainer, Heading, Text, Text2 } from "../CommonComponents";

function DataModal({ isDataModalOpen, closeDataModal, data }) {
	return (
		<Modal
			open={isDataModalOpen}
			onClose={closeDataModal}
			aria-labelledby="data-modal"
			aria-describedby="data-modal"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Container>
				<Heading>Submission Data</Heading>

				{data?.map((dataItem, index) => {
					if (dataItem.field !== "Cart Items") {
						return (
							<FieldContainer key={index}>
								<Text2 style={{ marginBottom: "1rem" }}>
									{dataItem.field}
								</Text2>
								<Text>{dataItem.value}</Text>
							</FieldContainer>
						);
					} else {
						return (
							<FieldContainer key={index}>
								<Text2 style={{ marginBottom: "1rem" }}>
									{dataItem.field}
								</Text2>
								{dataItem.value.map((cartItem) => {
									return (
										<FieldContainer
											style={{
												border: "2px solid #FE5454",
												borderRadius: "10px",
												margin: "1rem 0",
												padding: "1rem",
											}}
											key={cartItem.id}
										>
											<Text2
												style={{
													marginBottom: "0.5rem",
												}}
											>
												Item Name
											</Text2>
											<Text
												style={{
													marginBottom: "1.5rem",
												}}
											>
												{cartItem.name}
											</Text>

											<Text2
												style={{
													marginBottom: "0.5rem",
												}}
											>
												Item Quantity
											</Text2>
											<Text
												style={{
													marginBottom: "1.5rem",
												}}
											>
												{cartItem.quantity}
											</Text>

											<Text2
												style={{
													marginBottom: "0.5rem",
												}}
											>
												Item Price (per piece)
											</Text2>
											<Text
												style={{
													marginBottom: "1.5rem",
												}}
											>
												${cartItem.price}
											</Text>

											<Text2
												style={{
													marginBottom: "0.5rem",
												}}
											>
												Includes Bag (add $2 to cost)
											</Text2>
											<Text
												style={{
													marginBottom: "1.5rem",
												}}
											>
												{cartItem.wantBag
													? "Yes"
													: "No"}
											</Text>

											<Text2
												style={{
													marginBottom: "0.5rem",
												}}
											>
												Item Cost (quantity * price)
											</Text2>
											<Text>${cartItem.cost}</Text>
										</FieldContainer>
									);
								})}
							</FieldContainer>
						);
					}
				})}
			</Container>
		</Modal>
	);
}

const Container = styled(Box)`
	max-width: 450px;
	width: 80vw;
	padding: 4rem;
	border: none;
	border-radius: 10px;
	background-color: ${(props) => props.theme.palette.light.main};
	${(props) => props.theme.breakpoints.down("sm")} {
		padding: 3rem 1rem;
	}
	box-shadow: 24px;
	overflow-y: auto;
	overflow-x: hidden;
	min-height: 320px;
	max-height: 80vh;
	z-index: 20;

	&::-webkit-scrollbar {
		border-radius: 10px;
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		border-radius: 10px;
		background: ${(props) => props.theme.palette.light.main};
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: ${(props) => props.theme.palette.primary.main};
	}

	&::-webkit-scrollbar-thumb:hover {
		background: ${(props) => props.theme.palette.primary.dark};
	}
`;

export default DataModal;
