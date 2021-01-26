import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useStyles from "styles/PizzaList.js";
import { Grid } from "@material-ui/core";
import PizzaCard from "components/PizzaCard";
import PizzaEditor from "components/PizzaEditor";

function PizzaList() {
	const classes: any = useStyles();

	const [pizzaList, setPizzaList] = useState([]);
	const [selectedPizza, setSelectedPizza] = useState(undefined);

	const getPizzas = async () => {
		const categoryTypeResponse = await fetch("https://localhost:44358/api/Test/CategoryType");
		const categoryTypes = await categoryTypeResponse.json();
		const pizzaTypeID: number = categoryTypes.data.filter((x: any) => x.Name === "Pizza")[0].ID;

		const categoriesResponse = await fetch("https://localhost:44358/api/Test/Category");
		let categories = await categoriesResponse.json();
		categories = categories.data.filter((x: any) => x.CategoryType_ID === pizzaTypeID);

		const pizzasResponse = await fetch("https://localhost:44358/api/Test/Pizza");
		const pizzas = await pizzasResponse.json();

		let tempPizzaList: any = [];

		categories.forEach((category: any) => {
			tempPizzaList.push({ ...category, pizzas: pizzas.data.filter((x: any) => x.Category_ID === category.ID) });
		});

		console.log(tempPizzaList);

		setPizzaList(tempPizzaList);
	};

	useEffect(() => {
		getPizzas();
	}, []);

	function handleClick(pizza: any) {
        setSelectedPizza(pizza);
		console.log(pizza);
	}

	return (
		<div>
			<Grid container justify={"flex-start"} className={selectedPizza ? classes.overlay : classes.container}>
				{/* Pizza listing */}
				<Grid item lg={9}>
					{pizzaList.map(
						(category: any) =>
							category.pizzas.length > 0 && (
								<div key={category.ID}>
									<h1>
										{category.Name} ({category.pizzas.length})
									</h1>
									<Grid container justify={"flex-start"} alignContent={"flex-start"} className={classes.pizzaList}>
										{category.pizzas.map((pizza: any) => (
											<Grid key={pizza.ID} item lg={4} className={classes.pizzaContainer}>
												<Box onClick={() => {handleClick({...pizza})}}>
													<PizzaCard key={pizza.Name} name={pizza.Name} price={pizza.Price} />
												</Box>
											</Grid>
										))}
									</Grid>
								</div>
							)
					)}
				</Grid>

				{/* Basket */}
				<Grid item lg={3} className={classes.basketContainer}>
					<div className={classes.basket}>
						<h1>Basket</h1>
					</div>
				</Grid>
			</Grid>
            {
                selectedPizza !== undefined &&
                <PizzaEditor onClose={() => {setSelectedPizza(undefined)}} pizza={selectedPizza} />
            }
			
		</div>
	);
}

export default PizzaList;
