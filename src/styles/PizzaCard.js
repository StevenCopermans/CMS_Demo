import { makeStyles } from "@material-ui/core/styles";
import pizza from "../components/pizza.jpg";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        backgroundColor: "white",
        // minHeight: "300px",
        borderRadius: "8px",
        padding: "8px",
        position: "relative",
        boxShadow: "5px 5px 5px 2px rgba(0,0,0,0.2)",
    },
    image: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "200px",
        width: "100%",
        borderRadius: "8px 8px 0 0",
        backgroundImage: `url(${pizza})`,
        backgroundSize: "100% auto",
    },
    data: {
        marginTop: "200px",
    },
}));

export default useStyles;
