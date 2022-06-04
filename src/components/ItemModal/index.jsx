import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import {
	CustomButton,
	ErrorText,
	Text,
	Text2,
	CustomSlider,
	Heading,
	SubHeading,
	FieldContainer,
} from "../CommonComponents";

function ItemModal({
	isItemModalOpen,
	closeItemModal,
	setCart,
	cart,
	setEditItem,
	editItem,
}) {
	const [item, setItem] = useState("");
	const [wantBag, setWantBag] = useState(false);
	const [quantity, setQuantity] = useState(0);
	const [cost, setCost] = useState(0);

	// errors state
	const [errors, setErrors] = useState({
		item: { status: false, message: "" },
		quantity: { status: false, message: "" },
	});

	// function runs when item is edited
	useEffect(() => {
		if (editItem) {
			setItem(editItem.name);
			setQuantity(editItem.quantity);
			setWantBag(editItem.wantBag);
		}
	}, [editItem]);

	// ids of each item
	const nameToIds = {
		"Poke Ball": 1,
		"Great Ball": 2,
		"Super Potion": 3,
		"Hyper Potion": 4,
	};

	// prices for each item
	const prices = {
		"Poke Ball": 5,
		"Great Ball": 10,
		"Super Potion": 10,
		"Hyper Potion": 20,
	};

	// function to set wantBag
	const handleBagSwitch = (event) => {
		setWantBag(event.target.checked);
	};

	// function to set item
	const handleItem = (event) => {
		setItem(event.target.value);
	};

	// function to set quantity
	const handleQuantity = (event) => {
		setQuantity(event.target.value);
	};

	// function to calculate cost
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
		if (item.length > 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					item: { status: false, message: "" },
				};
			});
		}

		if (quantity > 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					quantity: {
						status: false,
						message: "",
					},
				};
			});
		}

		calculateCost();
	}, [item, quantity, wantBag]);

	// function to add item to cart / edit item in cart
	const addToCartHandler = () => {
		if (item.length === 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					item: { status: true, message: "Please select an item!" },
				};
			});

			return;
		} else {
			setErrors((prevState) => {
				return {
					...prevState,
					item: { status: false, message: "" },
				};
			});
		}

		if (quantity === 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					quantity: {
						status: true,
						message: "Quantity must be greater than 0!",
					},
				};
			});

			return;
		} else {
			setErrors((prevState) => {
				return {
					...prevState,
					quantity: {
						status: false,
						message: "",
					},
				};
			});
		}

		if (item.length > 0 && quantity > 0) {
			let itemAlreadyPresentInCart = false;

			cart.forEach((cartItem) => {
				if (cartItem.name === item) {
					itemAlreadyPresentInCart = true;
				}
			});

			if (editItem) {
				cart.forEach((cartItem) => {
					if (cartItem.id === editItem.id) {
						cartItem.quantity = quantity;
						cartItem.wantBag = wantBag;
						cartItem.cost = cost;
					}
				});
				setCart([...cart]);
				setEditItem(null);
			} else if (itemAlreadyPresentInCart) {
				cart.forEach((cartItem) => {
					if (cartItem.name === item) {
						cartItem.quantity = quantity;
						cartItem.wantBag = wantBag;
						cartItem.cost = cost;
					}
				});
				setCart([...cart]);
				itemAlreadyPresentInCart = false;
			} else {
				setCart((prevState) => {
					return [
						...prevState,
						{
							id: nameToIds[item],
							name: item,
							price: prices[item],
							quantity,
							wantBag,
							cost,
						},
					];
				});
			}

			setItem("");
			setCost(0);
			setQuantity(0);
			setWantBag(false);
			closeItemModal();
		}
	};

	return (
		<Modal
			open={isItemModalOpen}
			onClose={closeItemModal}
			aria-labelledby="item-modal"
			aria-describedby="item-modal"
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
							disabled={editItem ? true : false}
							error={errors?.item?.status}
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

						<ErrorText>
							{errors?.item?.status ? errors?.item?.message : ""}
						</ErrorText>
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
					<ErrorText>
						{errors?.quantity?.status
							? errors?.quantity?.message
							: ""}
					</ErrorText>
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

export default ItemModal;
