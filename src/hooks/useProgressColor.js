import { useEffect, useState } from "react";

export function useProgressColor(value) {
    const [color, setColor] = useState("green");

    useEffect(() => {
        console.log("==== calculating color ====")
        if (value >= 40 && value < 70) {
            setColor('#FAD02C');
        }
        else if (value >= 30 && value < 40) {
            setColor('orange');
        } else if (value < 30) {
            setColor('red');
        } else {
            setColor('green');
        }
    })
    return color;
}