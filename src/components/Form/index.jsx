import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import ItemModal from "../ItemModal";

function Form() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const [region, setRegion] = useState("");
	const [selectedPokemon, setSelectedPokemon] = useState(null);

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

	const handleRegion = (event) => {
		setRegion(event.target.value);
	};

	const pokemonSelectHandler = (pokemonId) => {
		const selectedPokemon = pokemons[region]?.filter(
			(pokemon) => pokemon.id === pokemonId
		);

		if (selectedPokemon && selectedPokemon[0]) {
			setSelectedPokemon(selectedPokemon[0]?.name);
		}
	};

	const [cart, setCart] = useState([]);

	return (
		<Container component="form" noValidate autoComplete="off">
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
				/>
			</FieldContainer>

			<FieldContainer style={{ marginBottom: "5rem" }}>
				<TextField
					id="code-name"
					label="Code Name"
					variant="filled"
					fullWidth
				/>
			</FieldContainer>

			<FieldContainer>
				<CustomSlider
					size="small"
					min={0}
					max={100}
					valueLabelDisplay="auto"
				/>

				<Text>How far is your nearest pokemon center? (In KMs)</Text>
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

			<Text2>Choose your starter pokemon</Text2>

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
					<Text>Please select region!</Text>
				)}
			</FieldContainer>

			<FieldContainer
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text2>What do you want to pack?</Text2>
				<AddModalButton type="button" onClick={openModal}>
					<AddIcon />
				</AddModalButton>
			</FieldContainer>

			{/* <FieldContainer
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				{cart.length>0?cart.map(item=>{return item})
			</FieldContainer> */}

			<ItemModal
				isModalOpen={isModalOpen}
				closeModal={closeModal}
				setCart={setCart}
			/>
		</Container>
	);
}

const Container = styled(Box)`
	position: relative;
	max-width: 400px;
	width: 85vw;
	padding: 4rem;
	border-radius: 10px;
	background-color: ${(props) => props.theme.palette.light.main};
	${(props) => props.theme.breakpoints.down("sm")} {
		padding: 1rem;
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

const Pokemon = styled.img`
	padding: 1rem;
	background-color: ${(props) => props.theme.palette.gray.veryLight};
	width: 70px;
	height: 70px;
	border-radius: 100%;
	cursor: pointer;
	border: 2px solid ${(props) => props.theme.palette.light.main};
	transition: all 0.3s ease-in-out;

	${(props) => props.theme.breakpoints.down("sm")} {
		width: 40px;
		height: 40px;
	}

	&:hover {
		transform: scale(1.1);
		border: 2px solid ${(props) => props.theme.palette.primary.main};
	}

	${(props) => props.isSelected === false} {
		border: 2px solid ${(props) => props.theme.palette.primary.main};
		transform: scale(1.1);
	} ;
`;

const AddModalButton = styled.button`
	border: none;
	cursor: pointer;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 45px;
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

export default Form;
