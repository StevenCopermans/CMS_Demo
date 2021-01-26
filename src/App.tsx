import React from "react";
import Container from "@material-ui/core/Container";
import Header from "components/Header";
import PizzaList from "components/PizzaList";

function App() {
	return (
		<Container maxWidth={false} disableGutters>
			<Header />
			<PizzaList />
		</Container>
	);
}

export default App;
