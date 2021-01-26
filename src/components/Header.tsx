import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import useStyles from "styles/Header.js";
import { Grid } from "@material-ui/core";

function Header() {
    const classes : any = useStyles();

	return (
		<Container className={classes.container} maxWidth={false}>
			<Grid container justify={"space-between"} alignContent={"center"} className={classes.grid}>
				{/* Shop name */}
				<Grid item>
					<Typography variant="h4" component="h1">
						Pizza
					</Typography>
				</Grid>

				{/* Navigation */}
				<Grid item>
					<Grid container>
						<Grid item>
							<Typography variant="h4" component="h1">
								Pizza's
							</Typography>
						</Grid>
					</Grid>
				</Grid>

				{/* Login */}
				<Grid item>
					<Typography variant="h4" component="h1">
						Login
					</Typography>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Header;
