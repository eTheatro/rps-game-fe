import "./styles.css";

import { useEffect } from "react";
import { Progress } from "./Pgrogress";



export function Score(props) {

    useEffect(() => {
    }, [])

    return  <><Progress value={props.p1} color='blue' /></>
}