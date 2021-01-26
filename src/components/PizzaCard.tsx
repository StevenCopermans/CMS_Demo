import React from "react";
import useStyles from "styles/PizzaCard.js";

function PizzaCard(props: any) {
	const classes: any = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.image}></div>
			<div className={classes.data}>
				<h2>{props.name}</h2>
				<p>{props.price}</p>
			</div>
		</div>
	);
}

export default PizzaCard;
