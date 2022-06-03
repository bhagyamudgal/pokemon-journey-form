import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import Home from "./pages/Home";

const theme = createTheme({
	palette: {
		primary: { main: "#FE5454", dark: "#f52b2b" },
		secondary: { main: "#75F4FE" },
		gray: { veryLight: "#F0F0F0", light: "#889296", dark: "#00000099" },
		light: { main: "#FFFFFF" },
		text: { main: "#000000DE" },
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Home />
			</Container>
		</ThemeProvider>
	);
}

const Container = styled.div`
	min-height: 100vh;
	background: url("/images/background.png");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
`;

export default App;
