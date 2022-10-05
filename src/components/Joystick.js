import { motion } from "framer-motion";
import { useEffect } from "react";
import PaperImage from "../assets/paper.png";
import RockImage from "../assets/rock.png";
import ScissorImage from "../assets/scissor.png";

import { useDispatch, useSelector } from 'react-redux';
import { play } from "../state/playerSlice";


export function Joystick(props) {


    useEffect(() => {

    }, [])

    return <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <JoystickItem onClick={props.onClick} image={ScissorImage} hand="Scissor">
                <img width={100} heigth={100} src={ScissorImage} style={{ marginRight: 100, transform: 'rotate(260deg)' }} />
            </JoystickItem>
            <JoystickItem onClick={props.onClick} image={RockImage} hand="Rock">
                <img width={100} heigth={100} src={RockImage} style={{ transform: 'rotate(320deg)' }} />
            </JoystickItem>
            <JoystickItem onClick={props.onClick} image={PaperImage} hand="Paper">
                <img width={100} heigth={100} src={PaperImage} style={{ marginLeft: 100, transform: 'rotate(260deg)' }} />
            </JoystickItem>
        </div>
    </div>
}


function JoystickItem(props) {
    const player1 = { player1: { hand: props.hand, image: Math.random + '-' + props.image } };
    const dispatch = useDispatch()
    return <span onClick={() => {
        dispatch(play(player1));


    }} style={{ cursor: 'pointer' }}><motion.div
        whileHover={{ scale: [null, 1.2, 1.4], }}
        transition={{ duration: 0.1 }}
    >
            {props.children}
        </motion.div></span>
}