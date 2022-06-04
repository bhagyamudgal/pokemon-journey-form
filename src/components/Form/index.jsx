import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import ItemModal from "../ItemModal";
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
import DataModal from "../DataModal";

function Form() {
	// state for submission data
	const [submissionData, setSubmissionData] = useState([]);

	// state for item modal
	const [isItemModalOpen, setIsItemModalOpen] = useState(false);

	// state for data modal
	const [isDataModalOpen, setIsDataModalOpen] = useState(false);

	// form states
	const [name, setName] = useState("");
	const [codeName, setCodeName] = useState("");
	const [distance, setDistance] = useState(0);

	// state for edit item
	const [editItem, setEditItem] = useState(null);

	// error states
	const [errors, setErrors] = useState({
		name: { status: false, message: "" },
		codeName: { status: false, message: "" },
	});

	// state for region
	const [region, setRegion] = useState("");

	// state for selected pokemon
	const [selectedPokemon, setSelectedPokemon] = useState(null);

	// pokemon region wise data
	const pokemons = {
		Kanto: [
			{ id: 0, image: "/images/bulbasaur.png", name: "Bulbasaur" },
			{ id: 1, image: "/images/charmander.png", name: "Charmander" },
			{ id: 2, image: "/images/squirtle.png", name: "Squirtle" },
		],
		Jhoto: [
			{ id: 0, image: "/images/chikorita.png", name: "Chikorita" },
			{ id: 1, image: "/images/cyndaquil.png", name: "Cyndaquil" },
			{ id: 2, image: "/images/totodile.png", name: "Totodile" },
		],
		Hoenn: [
			{ id: 0, image: "/images/treecko.png", name: "Treecko" },
			{ id: 1, image: "/images/torchic.png", name: "Torchic" },
			{ id: 2, image: "/images/mudkip.png", name: "Mudkip" },
		],
	};

	// state for item cart
	const [cart, setCart] = useState([]);

	// state for total item cost
	const [totalCost, setTotalCost] = useState(0);

	// function to open item modal
	const openItemModal = () => {
		setIsItemModalOpen(true);
	};

	// function to close item modal
	const closeItemModal = () => {
		setIsItemModalOpen(false);
	};

	// function to open data modal
	const openDataModal = () => {
		setIsDataModalOpen(true);
	};

	// function to close data modal
	const closeDataModal = () => {
		setIsDataModalOpen(false);
	};

	// function to set region
	const handleRegion = (event) => {
		setRegion(event.target.value);
	};

	// function to set distance
	const handleDistance = (event) => {
		setDistance(event.target.value);
	};

	// function to set selected pokemon
	const pokemonSelectHandler = (pokemonId) => {
		const selectedPokemon = pokemons[region]?.filter(
			(pokemon) => pokemon.id === pokemonId
		);

		if (selectedPokemon && selectedPokemon[0]) {
			setSelectedPokemon(selectedPokemon[0]?.name);
		}
	};

	// function to delete item from cart
	const itemDeleteHandler = (itemId) => {
		const newCart = cart.filter((item) => item.id !== itemId);

		setCart(newCart);
	};

	// function to edit item in cart
	const itemEditHandler = (item) => {
		setEditItem(item);

		openItemModal();
	};

	// function to calculate total cost
	const calculateTotalCost = () => {
		let totalCost = 0;

		cart.forEach((cartItem) => {
			totalCost += parseInt(cartItem.cost);
		});

		setTotalCost(totalCost);
	};

	useEffect(() => {
		calculateTotalCost();
	}, [cart]);

	useEffect(() => {
		if (name.length > 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					name: { status: false, message: "" },
				};
			});
		}

		if (codeName.length > 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					codeName: { status: false, message: "" },
				};
			});
		}

		if (distance > 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					distance: { status: false, message: "" },
				};
			});
		}

		if (selectedPokemon) {
			setErrors((prevState) => {
				return {
					...prevState,
					selectedPokemon: { status: false, message: "" },
				};
			});
		}
	}, [name, codeName, distance, selectedPokemon]);

	// function to handle form submission
	const formSubmitHandler = (event) => {
		event.preventDefault();

		if (name.length === 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					name: { status: true, message: "Please fill your name!" },
				};
			});

			return;
		} else {
			setErrors((prevState) => {
				return {
					...prevState,
					name: { status: false, message: "" },
				};
			});
		}

		if (codeName.length === 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					codeName: {
						status: true,
						message: "Please fill your code name!",
					},
				};
			});

			return;
		} else {
			setErrors((prevState) => {
				return {
					...prevState,
					codeName: { status: false, message: "" },
				};
			});
		}

		if (distance === 0) {
			setErrors((prevState) => {
				return {
					...prevState,
					distance: {
						status: true,
						message: "Please select distance!",
					},
				};
			});

			return;
		} else {
			setErrors((prevState) => {
				return {
					...prevState,
					distance: { status: false, message: "" },
				};
			});
		}

		if (region.length === 0) {
			return;
		}

		if (selectedPokemon === null) {
			setErrors((prevState) => {
				return {
					...prevState,
					selectedPokemon: {
						status: true,
						message: "Please select pokemon!",
					},
				};
			});

			return;
		} else {
			setErrors((prevState) => {
				return {
					...prevState,
					selectedPokemon: {
						status: false,
						message: "",
					},
				};
			});
		}

		if (cart.length === 0) {
			return;
		}

		const result = [
			{
				field: "Full Name",
				value: name,
			},
			{
				field: "Code Name",
				value: codeName,
			},
			{
				field: "Distance to Nearest Pokemon Center",
				value: `${distance} KM`,
			},
			{
				field: "Starting Region",
				value: region,
			},
			{
				field: "Starter Pokemon",
				value: selectedPokemon,
			},
			{
				field: "Cart Items",
				value: cart,
			},
			{
				field: "Total Cost",
				value: `$${totalCost}`,
			},
		];

		setSubmissionData(result);
		resetForm();
		openDataModal();
	};

	// function to reset form
	const resetForm = () => {
		setName("");
		setCodeName("");
		setDistance(0);
		setRegion("");
		setSelectedPokemon(null);
		setCart([]);
		setTotalCost(0);
	};

	return (
		<Container
			component="form"
			noValidate
			autoComplete="off"
			onSubmit={formSubmitHandler}
		>
			<Heading>Fill This Form</Heading>
			<SubHeading>
				We'll use this info to dominate the poke world! Muhahahahah
			</SubHeading>

			<FieldContainer>
				<TextField
					id="full-name"
					label="Full Name"
					variant="filled"
					fullWidth
					onChange={(event) => {
						setName(event.target.value);
					}}
					value={name}
					error={errors?.name?.status}
					helperText={
						errors?.name?.status ? errors?.name?.message : ""
					}
				/>
			</FieldContainer>

			<FieldContainer style={{ marginBottom: "5rem" }}>
				<TextField
					id="code-name"
					label="Code Name"
					variant="filled"
					fullWidth
					onChange={(event) => {
						setCodeName(event.target.value);
					}}
					value={codeName}
					error={errors?.codeName?.status}
					helperText={
						errors?.codeName?.status
							? errors?.codeName?.message
							: ""
					}
				/>
			</FieldContainer>

			<FieldContainer>
				<CustomSlider
					size="small"
					min={0}
					max={100}
					valueLabelDisplay="auto"
					value={distance}
					onChange={handleDistance}
				/>

				<Text>How far is your nearest pokemon center? (In KMs)</Text>
				<ErrorText>
					{errors?.distance?.status ? errors?.distance?.message : ""}
				</ErrorText>
			</FieldContainer>

			<FieldContainer>
				<FormControl variant="filled" fullWidth>
					<InputLabel id="region">
						What's your starting region?
					</InputLabel>
					<Select
						labelId="region"
						id="region"
						value={region}
						onChange={handleRegion}
					>
						<MenuItem value="Kanto">Kanto</MenuItem>
						<MenuItem value="Jhoto">Jhoto</MenuItem>
						<MenuItem value="Hoenn">Hoenn</MenuItem>
					</Select>
				</FormControl>
			</FieldContainer>

			<Text2 style={{ marginBottom: "1rem" }}>
				Choose your starter pokemon
			</Text2>

			<ErrorText style={{ marginBottom: "1.5rem" }}>
				{errors?.selectedPokemon?.status
					? errors?.selectedPokemon?.message
					: ""}
			</ErrorText>

			<FieldContainer
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				{region.length > 0 ? (
					pokemons[region]?.map((pokemon) => {
						return (
							<Pokemon
								key={pokemon.id}
								src={pokemon.image}
								onClick={() => pokemonSelectHandler(pokemon.id)}
								isSelected={selectedPokemon === pokemon.name}
							/>
						);
					})
				) : (
					<ErrorText style={{ marginTop: "0" }}>
						Please select region!
					</ErrorText>
				)}
			</FieldContainer>

			<FieldContainer
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "0.5rem",
				}}
			>
				<Text2>What do you want to pack?</Text2>
				<AddModalButton type="button" onClick={openItemModal}>
					<AddIcon />
				</AddModalButton>
			</FieldContainer>

			<FieldContainer
				style={{
					display: "flex",
					alignItems: "center",
					flexWrap: "wrap",
				}}
			>
				{cart.length > 0 ? (
					cart.map((item) => {
						return (
							<ItemChip key={item.id} wantBag={item.wantBag}>
								<p onClick={() => itemEditHandler(item)}>
									{item.quantity} {item.name}
								</p>
								<DeleteButton
									type="button"
									onClick={() => itemDeleteHandler(item.id)}
								>
									x
								</DeleteButton>
							</ItemChip>
						);
					})
				) : (
					<ErrorText style={{ marginTop: "0" }}>
						No items to show! Please add item
					</ErrorText>
				)}
			</FieldContainer>

			<FieldContainer
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "4rem",
				}}
			>
				<Text2 style={{ fontWeight: "bold", fontSize: "17px" }}>
					Total Cost
				</Text2>
				<Text style={{ fontWeight: "bold", fontSize: "17px" }}>
					${totalCost}
				</Text>
			</FieldContainer>

			<FieldContainer
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: "0",
				}}
			>
				<CustomButton type="submit">START MY JOURNEY</CustomButton>
			</FieldContainer>

			<ItemModal
				isItemModalOpen={isItemModalOpen}
				closeItemModal={closeItemModal}
				setCart={setCart}
				cart={cart}
				editItem={editItem}
				setEditItem={setEditItem}
			/>

			<DataModal
				isDataModalOpen={isDataModalOpen}
				closeDataModal={closeDataModal}
				data={submissionData}
			/>
		</Container>
	);
}

const Container = styled(Box)`
	position: relative;
	max-width: 450px;
	width: 85vw;
	padding: 4rem;
	border-radius: 10px;
	background-color: ${(props) => props.theme.palette.light.main};
	${(props) => props.theme.breakpoints.down("sm")} {
		padding: 3rem 1rem;
	}
`;

const Pokemon = styled.img`
	padding: 1rem;
	background-color: ${(props) => props.theme.palette.gray.veryLight};
	width: 27%;
	height: 27%;
	border-radius: 100%;
	cursor: pointer;
	border: 2px solid ${(props) => props.theme.palette.light.main};
	transition: all 0.3s ease-in-out;

	&:hover {
		transform: scale(1.2);
		border: 2px solid ${(props) => props.theme.palette.primary.main};
	}

	${(props) => props.isSelected === false} {
		border: 2px solid ${(props) => props.theme.palette.primary.main};
		transform: scale(1.2);
	} ;
`;

const AddModalButton = styled.button`
	border: none;
	cursor: pointer;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background-color: ${(props) => props.theme.palette.primary.main};
	color: ${(props) => props.theme.palette.light.main};
	transition: all 0.3s ease-in-out;

	&:hover {
		transform: scale(1.2);
		background-color: ${(props) => props.theme.palette.primary.main};
	}

	& > svg {
		font-size: 2rem;
	}
`;

const ItemChip = styled.span`
	background-color: ${(props) => props.theme.palette.gray.veryLight};
	padding: 0.5rem 1rem;
	border-radius: 20px;
	display: flex;
	align-items: center;
	margin: 0 1rem 1rem 0;
	cursor: pointer;

	${(props) => props.wantBag === false} {
		background-color: ${(props) => props.theme.palette.secondary.main};
	}

	p {
		color: ${(props) => props.theme.palette.gray.dark};
		margin-right: 0.5rem;
		font-size: 14px;
		font-weight: 500;
	}
`;

const DeleteButton = styled.button`
	border: none;
	cursor: pointer;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 10px;
	height: 10px;
	padding: 0.5rem;
	color: ${(props) => props.theme.palette.light.main};
	background-color: ${(props) => props.theme.palette.gray.dark};
	transition: all 0.2s ease-in-out;
	z-index: 20;

	&:hover {
		transform: scale(1.2);
	}
`;

export default Form;
