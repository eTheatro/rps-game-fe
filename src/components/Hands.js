import { useEffect } from "react";
import { Player } from "./Player";

import { useSelector } from 'react-redux';

export function Hands() {

    const player = useSelector((state) => state.player?.player1)
    const cpu = useSelector((state) => state.player?.cpu)
    const uuid = useSelector((state) => state.player?.uuid)


    useEffect(() => {
    }, [])


    return <>
        <Player type="player1" image={player?.image} uuid={uuid} />
        <Player type="cpu" image={cpu?.image} uuid={uuid} />
    </>
}