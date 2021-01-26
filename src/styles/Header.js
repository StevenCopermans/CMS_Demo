import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
        backgroundColor: theme.palette.primary.main,
        height: "80px",
    },
    grid: {
        margin: "auto",
        maxWidth: theme.breakpoints.values.lg,
        backgroundColor: theme.palette.secondary.main,
        height: "100%"
    }
}));

export default useStyles;
