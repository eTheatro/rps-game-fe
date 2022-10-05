import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

import { useProgressColor } from '../hooks/useProgressColor';

export const Life = () => {

  const player = useSelector((state) => state.player?.player1)
  const color = useProgressColor(player.score);

  const scaleX = useSpring(player.score / 100, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    scaleX.set(player.score / 100)
  }, [player.score])
  return (
    <motion.div className="progress-bar" style={{ scaleX, width: '100vw', height: 40, backgroundColor: color }}>
    </motion.div>
  )
}