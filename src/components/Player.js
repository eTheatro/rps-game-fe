import { useEffect, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import RockImage from "../assets/rock.png";
import { Hand } from "./Hand"
import { useSelector, useDispatch } from 'react-redux'
import { hitCPU, hitPlayer1 } from "../state/playerSlice";
import axios from "axios";
export function Player(props) {
    
    const dispatch = useDispatch()
    const controls = useAnimationControls()
    const [image, setImage] = useState(RockImage);

    const player = useSelector((state) => state.player?.player1)
    const cpu = useSelector((state) => state.player?.cpu)


    const variants = { scale: [1, 1.4, 1,1, 1.4, 1,1, 2, 1] }

    const fireRules = () => {
        axios.post("http://localhost:8080/fireRules", {
            player: {
                hand: {
                    type: player.hand
                }
            },
            cpu: {
                hand: {
                    type: cpu.hand
                }
            }
        }, {
            headers: { 
                'Content-Type' : 'application/json' 
            }
        })
            .then(({ data }) => {
                dispatch(hitPlayer1(data.hit));
            })
    }
    
    useEffect(() => {
        setImage(RockImage)
        controls.start(variants).then(() => {
            if (props.image) {
                if (props.type === 'player1') {
                    setImage(props.image.split('-')[1])
                    
                    if( player.hand === 'Paper' && cpu.hand === 'Scissor') {
                        dispatch(hitPlayer1());
                    } else if( player.hand === 'Scissor' && cpu.hand === 'Rock') {
                        dispatch(hitPlayer1());
                    }
                    else if( player.hand === 'Rock' && cpu.hand === 'Paper') {
                        dispatch(hitPlayer1());
                    }
                    //fireRules();
                } else {
                    setImage(props.image)
                }
            }
            
        })
    }, [props.uuid])

    return <div style={{ position: 'absolute' }}>
        <motion.div animate={controls} 
            style={{ justifyContent: 'flex-end' }}>
            <Hand type={props.type} image={image} />
        </motion.div>
    </div>
}
