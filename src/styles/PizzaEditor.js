import { makeStyles } from "@material-ui/core/styles";
import pizza from "../components/pizza.jpg";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "RGBA(0,0,0,0.2)",
        position: "absolute",
        top: "0vh",
        left: "0vw",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "900px",
        height: "90vh",
        position: "relative",
        left: 0,
        top: 0,
        backgroundColor: "#fff",
        "& h2": {
            margin: "8px 0",
        },
        "& h3": {
            margin: "0 0 4px 0",
        },
    },
    header: {
        position: "relative",
        width: "100%",
        borderBottom: "1px solid grey",
        padding: "8px 16px",
    },
    cross: {
        padding: 0,
        width: "20px",
        height: "20px",
    },
    title: {
        margin: 0,
        padding: 0
    },
    content: {
        width: "100%",
        padding: "8px 16px",
    },
    offset: {
        paddingLeft: "16px",
        marginBottom: "8px",
    },
    fullWidth: {
        width: "100%",
    },
    input: {
        marginRight: "8px",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: "8px 16px",
        borderTop: "1px solid grey",
    },
}));

export default useStyles;
