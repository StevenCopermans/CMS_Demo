import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pizzaContainer: {
        padding: "12px",
        width: "100%",
    },
    container: {
        maxWidth: theme.breakpoints.values.lg,
        height: "100%",
        margin: "auto",
    },
    basket: {
        padding: "16px",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "8px",
        boxShadow: "5px 5px 5px 2px rgba(0,0,0,0.2)",
        "& h1": {
            margin: 0,
        },
    },
    overlay: {
        left: "calc(50% - " + theme.breakpoints.values.lg / 2 + "px)",
        maxWidth: theme.breakpoints.values.lg,
        height: "100%",
        overflowY: "hidden",
        position: "fixed",
    },
    basketContainer: {
        height: "100%",
        position: "-webkit-sticky",
        position: "sticky",
        top: "0",
        padding: "12px",
    },
    pizzaContainer: {
        width: "100%",
        padding: "8px",
        "& h1": {
            marginBottom: 0,
        },
    }
}));

export default useStyles;
