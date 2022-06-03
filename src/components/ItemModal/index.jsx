import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";

function ItemModal({ isModalOpen, closeModal, setCart }) {
	const [item, setItem] = useState("");
	const [wantBag, setWantBag] = useState(false);
	const [quantity, setQuantity] = useState(0);
	const [cost, setCost] = useState(0);

	const prices = {
		"Poke Ball": 5,
		"Great Ball": 10,
		"Super Potion": 10,
		"Hyper Potion": 20,
	};

	const handleBagSwitch = (event) => {
		setWantBag(event.target.checked);
	};

	const handleItem = (event) => {
		setItem(event.target.value);
	};

	const handleQuantity = (event) => {
		setQuantity(event.target.value);
	};

	const calculateCost = () => {
		if (item.length > 0) {
			let cost = prices[item] * quantity;

			if (wantBag) {
				cost += 2;
			}

			setCost(cost);
		}
	};

	useEffect(() => {
		calculateCost();
	}, [item, quantity, wantBag]);

	const addToCartHandler = () => {
		if (item.length > 0 && quantity > 0) {
			setCart((prevState) => {
				return [
					...prevState,
					{ name: item, price: prices[item], quantity },
				];
			});
		}
	};

	return (
		<Modal
			open={isModalOpen}
			onClose={closeModal}
			aria-labelledby="add-modal"
			aria-describedby="add-modal"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Container>
				<Heading>Place Your Order</Heading>
				<SubHeading>
					We'll use this info to pack your order! Muhahahahahaha
				</SubHeading>

				<FieldContainer style={{ marginBottom: "5rem" }}>
					<FormControl variant="filled" fullWidth>
						<InputLabel id="item">Choose Item</InputLabel>
						<Select
							labelId="item"
							id="item"
							value={item}
							onChange={handleItem}
						>
							<MenuItem value="Poke Ball">Poke Ball</MenuItem>
							<MenuItem value="Great Ball">Great Ball</MenuItem>
							<MenuItem value="Super Potion">
								Super Potion
							</MenuItem>
							<MenuItem value="Hyper Potion">
								Hyper Potion
							</MenuItem>
						</Select>
					</FormControl>
				</FieldContainer>

				<FieldContainer>
					<CustomSlider
						size="small"
						min={0}
						max={10}
						valueLabelDisplay="auto"
						value={quantity}
						onChange={handleQuantity}
					/>

					<Text>Select Quantity</Text>
				</FieldContainer>

				<FieldContainer
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text2>I need a bag for that!</Text2>
					<Switch
						checked={wantBag}
						onChange={handleBagSwitch}
						inputProps={{ "aria-label": "bag-switch" }}
					/>
				</FieldContainer>

				<FieldContainer
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text2 style={{ fontWeight: "bold", fontSize: "17px" }}>
						Cost
					</Text2>
					<Text style={{ fontWeight: "bold", fontSize: "17px" }}>
						${cost}
					</Text>
				</FieldContainer>

				<FieldContainer
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<CustomButton type="button" onClick={addToCartHandler}>
						ADD TO CART
					</CustomButton>
				</FieldContainer>
			</Container>
		</Modal>
	);
}

const Container = styled(Box)`
	max-width: 400px;
	width: 80vw;
	padding: 4rem;
	border-radius: 10px;
	background-color: ${(props) => props.theme.palette.light.main};
	${(props) => props.theme.breakpoints.down("sm")} {
		padding: 1rem;
	}
	box-shadow: 24px;
	overflow-y: auto;
	overflow-x: hidden;
	min-height: 320px;
	max-height: 60vh;
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

const Heading = styled.h1`
	color: ${(props) => props.theme.palette.primary.main};
	font-size: 32px;
	text-align: center;
	margin-bottom: 2.5rem;
`;

const SubHeading = styled.h1`
	color: ${(props) => props.theme.palette.gray.light};
	font-size: 18px;
	text-align: center;
	margin-bottom: 2.5rem;
`;

const FieldContainer = styled.div`
	width: 100%;
	margin-bottom: 2.5rem;
`;

const CustomSlider = styled(Slider)`
	color: ${(props) => props.theme.palette.primary.main};

	.MuiSlider-track {
		border: none;
	}

	.MuiSlider-thumb {
		height: 15px;
		width: 15px;
		background-color: ${(props) => props.theme.palette.primary.main};
		border: 2px solid currentColor;

		&:focus,
		&:hover,
		.Mui-active,
		.Mui-focusVisible {
			box-shadow: inherit;
		}
		&:before {
			display: none;
		}
	}

	.MuiSlider-valueLabel {
		line-height: 1.2;
		font-size: 12px;
		padding: 0;
		width: 32px;
		height: 32px;
		border-radius: 50% 50% 50% 0;
		background-color: ${(props) => props.theme.palette.primary.main};
		transform-origin: bottom left;
		transform: translate(50%, -100%) rotate(-45deg);
		&:before {
			display: none;
		}
		.MuiSlider-valueLabelOpen {
			transform: translate(50%, -100%) rotate(-45deg) scale(1);
		}
		& > * {
			transform: rotate(45deg);
		}
	}
`;

const Text = styled.p`
	color: ${(props) => props.theme.palette.text.main};
`;

const Text2 = styled.p`
	color: ${(props) => props.theme.palette.gray.light};
`;

const CustomButton = styled.button`
	border: none;
	cursor: pointer;
	border-radius: 5px;
	padding: 1rem 4rem;
	background-color: ${(props) => props.theme.palette.primary.main};
	color: ${(props) => props.theme.palette.light.main};
	transition: all 0.3s ease-in-out;

	&:hover {
		transform: scale(1.1);
		background-color: ${(props) => props.theme.palette.primary.main};
	}
`;

export default ItemModal;
