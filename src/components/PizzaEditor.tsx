import React, { useState, useEffect } from "react";
import useStyles from "styles/PizzaEditor.js";
import { Grid, Box } from "@material-ui/core";

function PizzaEditor(props: any) {
	const classes: any = useStyles();

	const [sizeList, setSizeList] = useState([]);
	const [ingredientList, setIngredientList] = useState([]);
	const [inputs, setInputs] = useState([]);
	const [pizzaIngredientList, setPizzaIngredientList]: any = useState([]);
	const [quantity, setQuantity] = useState(1);

	const handleInput = (event: any) => {
		const tempInputs: any = { ...inputs };

		//console.log(event.target.id);
		tempInputs[event.target.name] = { Quantity: event.target.value, ID: event.target.id };

		setInputs(tempInputs);
	};

	const getSizes = async () => {
		const sizeResponse = await fetch("https://localhost:44358/api/Test/Size");
		const sizes = await sizeResponse.json();

		setSizeList(sizes.data);
	};

	const getIngredients = async () => {
		const categoryTypeResponse = await fetch("https://localhost:44358/api/Test/CategoryType");
		const categoryTypes = await categoryTypeResponse.json();
		const ingredientTypeID: number = categoryTypes.data.filter((x: any) => x.Name === "Ingredient")[0].ID;

		const categoriesResponse = await fetch("https://localhost:44358/api/Test/Category");
		let categories = await categoriesResponse.json();
		categories = categories.data.filter((x: any) => x.CategoryType_ID === ingredientTypeID);

		const ingredientResponse = await fetch("https://localhost:44358/api/Test/Ingredient");
		const ingredients = await ingredientResponse.json();

		const tempIngredients: any = { ...pizzaIngredientList };
		const pizzaIngredientsResponse = await fetch("https://localhost:44358/api/Test/PizzaIngredient");
		let pizzaIngredients = await pizzaIngredientsResponse.json();
		pizzaIngredients = pizzaIngredients.data.filter((x: any) => x.Pizza_ID === props.pizza.ID);

		pizzaIngredients.forEach((pizzaIngredient: any) => {
			const ingredient = ingredients.data.filter((x: any) => x.ID === pizzaIngredient.Ingredient_ID)[0];
			tempIngredients[ingredient.Name + ingredient.ID] = { Quantity: pizzaIngredient.Quantity, ID: ingredient.ID + "," + ingredient.Category_ID };
		});

		setPizzaIngredientList(tempIngredients);
		setInputs({ ...inputs, ...tempIngredients });

		//console.log("I still get here");

		let tempIngredientList: any = [];

		categories.forEach((category: any) => {
			tempIngredientList.push({ ...category, ingredients: ingredients.data.filter((x: any) => x.Category_ID === category.ID) });
		});

		//console.log("I don't get here");

		//console.log(tempIngredientList);

		//console.log("I still get here");

		setIngredientList(tempIngredientList);
	};

	const calculatePrice = () => {
		const tempInputs: any = { ...inputs };
		let price = 0;

		if (tempInputs["Size"] !== undefined) {
			console.log(tempInputs["Size"]);
			const size: any = sizeList.filter((x: any) => x.ID == tempInputs["Size"].Quantity);
			if (size.length > 0) {
				price += size[0].Price;
				console.log("HAHAHAHAH");
			}
		}

		const tempIngredientList: any = { ...ingredientList };

		for (const [key, value] of Object.entries(tempInputs)) {
			if (key !== "Size") {
				const tempValue: any = value;

				const quantity = tempValue.Quantity;
				const IDs = tempValue.ID.split(",").map(Number);

				for (const [_, value] of Object.entries(tempIngredientList)) {
					const catValue: any = value;
					if (catValue["ID"] === IDs[1]) {
						price += catValue.ingredients.filter((x: any) => x.ID === IDs[0])[0].Price * quantity;
					}
				}
			}
		}

		return price;
	};

	const onClose = () => {
		if (props.onClose) props.onClose();
	};

	const onSubmit = () => {
        const tempInputs = {...inputs};
        const tempPizzaIngredients = pizzaIngredientList;

        for (const [key, value] of Object.entries(tempInputs)) {
            console.log(value);
        }
        
        console.log(tempInputs);

        const pizza = {
            ID: props.pizza.ID,
            Quantity: quantity
        };
	};

	useEffect(() => {
		getSizes();
		getIngredients();
	}, []);

	return (
		<Grid container className={classes.backdrop}>
			<Grid item className={classes.container}>
				<Grid container className={classes.header} justify="space-between" alignItems="center">
					<h1 className={classes.title}>{props.pizza.Name}</h1>
					<svg xmlns="http://www.w3.org/2000/svg" className={classes.cross} onClick={onClose}>
						<line x1="0" y1="0" x2="20" y2="20" stroke="black" strokeWidth="2" />
						<line x1="20" y1="0" x2="0" y2="20" stroke="black" strokeWidth="2" />
					</svg>
				</Grid>
				<Grid container className={classes.content}>
					<h2>Size</h2>
					<Grid container direction="column" className={classes.offset}>
						{sizeList.map((size: any, i: number, list: any) => {
							const tempInputs: any = { ...inputs };
							const isChecked: boolean = tempInputs["Size"] === size.ID;
							return (
								<Grid container justify="space-between">
									<label>
										<input type="radio" value={size.ID} name="Size" {...(isChecked === true && "checked")} onClick={handleInput} />
										{size.Name}
									</label>
									<span className={classes.price}>{size.Price}&#8364;</span>
								</Grid>
							);
						})}
					</Grid>

					<h2>Toppings</h2>
					<Grid container className={classes.offset}>
						{ingredientList.map(
							(category: any) =>
								category.ingredients.length > 0 && (
									<div key={category.ID} className={classes.fullWidth}>
										<h3>{category.Name}</h3>

										{category.ingredients.map((ingredient: any) => (
											<Grid container justify="space-between" className={classes.offset}>
												<label>
													<input type="number" className={classes.input} id={ingredient.ID + "," + category.ID} name={ingredient.Name + ingredient.ID} defaultValue={pizzaIngredientList[ingredient.Name + ingredient.ID] ? pizzaIngredientList[ingredient.Name + ingredient.ID].Quantity : 0} min={0} max={5} onChange={handleInput} />
													{ingredient.Name}
												</label>
												<span className={classes.price}>{ingredient.Price}&#8364;</span>
											</Grid>
										))}
									</div>
								)
						)}
					</Grid>
				</Grid>
				<Grid container className={classes.footer} justify="space-between">
					<input type="button" value="Cancel" />
					<input
						type="number"
						className={classes.input}
						id={"test"}
						name={"test"}
						defaultValue="1"
						min="1"
						max="10"
						onChange={(event: any) => {
							setQuantity(event.target.value);
						}}
					/>
					<input type="button" value={"Add for " + quantity * calculatePrice() + "€"} onClick={onSubmit} />
				</Grid>
			</Grid>
		</Grid>
	);
}

PizzaEditor.defaultProps = {
	pizza: undefined,
	onClose: undefined,
	onOrder: undefined,
};

export default PizzaEditor;
