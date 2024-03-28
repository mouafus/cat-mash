import logo from "../../assets/logo.png";
import classes from "./logo.module.css";
import {Link} from "react-router-dom";
import {endpoints} from "../../endpoints.ts";

export default function Index() {
    return (
        <Link to={endpoints.home}>
            <img src={logo} className={classes.root} alt="App logo"/>
        </Link>
    )
}