import styled from "styled-components";
import Slider from "@mui/material/Slider";

export const Heading = styled.h1`
	color: ${(props) => props.theme.palette.primary.main};
	font-size: 32px;
	text-align: center;
	margin-bottom: 2.5rem;
`;

export const SubHeading = styled.h1`
	color: ${(props) => props.theme.palette.gray.light};
	font-size: 18px;
	text-align: center;
	margin-bottom: 2.5rem;
`;

export const FieldContainer = styled.div`
	width: 100%;
	margin-bottom: 2.5rem;
`;

export const CustomButton = styled.button`
	border: none;
	cursor: pointer;
	border-radius: 5px;
	padding: 1rem 4rem;
	background-color: ${(props) => props.theme.palette.primary.main};
	color: ${(props) => props.theme.palette.light.main};
	transition: all 0.3s ease-in-out;

	${(props) => props.theme.breakpoints.down("sm")} {
		padding: 1rem 2rem;
	}

	&:hover {
		transform: scale(1.1);
		background-color: ${(props) => props.theme.palette.primary.main};
	}
`;

export const CustomSlider = styled(Slider)`
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

export const Text = styled.p`
	color: ${(props) => props.theme.palette.text.main};
`;

export const Text2 = styled.p`
	color: ${(props) => props.theme.palette.gray.light};
`;

export const ErrorText = styled.p`
	color: red;
	margin-top: 0.5rem;
`;
