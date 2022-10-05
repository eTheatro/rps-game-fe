import { useEffect } from "react"
import { motion } from "framer-motion"



import ScissorImage from "../assets/scissor.png"

export function Hand(props) {

    useEffect(() => {
    }, [])

    return <HandFactory owner={props.type} image={props.image}></HandFactory>
}


function HandFactory(props) {
    let hand;
    switch (props?.owner) {
        case "player1":
            hand = <Player1Hand image={props.image} />
            break;
        case 'cpu':
            hand = <CpuHand image={props.image} />
            break;
        default:
            hand = <></>
    }
    return hand;
}



function Player1Hand(props) {
    return <motion.div
        animate={{ x: 200 }}
        transition={{ type: 'spring', velocity: 0.1 }}>
        <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop : -50 }}>
            <img width={200} height={200} src={props.image ? props.image : ScissorImage} />
        </div>
    </motion.div>
}

function CpuHand(props) {
    return <motion.div
        animate={{ x: -200 }}
        transition={{ type: 'spring', velocity: 0.1 }}><div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop : -50  }}>
            <img width={200} height={200} style={{ transform: 'rotate(180deg)', marginRight: 20 }} src={props.image} />
        </div></motion.div>
}