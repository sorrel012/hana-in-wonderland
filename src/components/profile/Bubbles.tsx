import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IBubbleProps {
  left: string;
}

const Bubble = styled(motion.img)<IBubbleProps>`
  width: 5%;
  position: absolute;
  left: ${(props) => props.left};
  bottom: -10%;
  opacity: 0;
`;

const bubbleVariants = (lineDelay: number) => ({
  animate: {
    y: [0, -window.innerHeight - 10],
    opacity: [1, 0],
    transition: {
      repeat: Infinity,
      duration: 5,
      delay: lineDelay,
    },
  },
});

function Bubbles() {
  const BUBBLE = '/images/profile/bubble.png';

  return (
    <>
      {/* 첫 번째 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Bubble
          key={i}
          src={BUBBLE}
          left="2vw"
          variants={bubbleVariants(i)}
          animate="animate"
        />
      ))}
      {/* 두 번째 */}
      {[0.5, 1.5, 2.5, 3.5, 4.5].map((i) => (
        <Bubble
          key={i * 3}
          src={BUBBLE}
          left="9vw"
          variants={bubbleVariants(i)}
          animate="animate"
        />
      ))}
      {/* 세 번째 */}
      {[0.5, 1.5, 2.5, 3.5, 4.5].map((i) => (
        <Bubble
          key={i * 5}
          src={BUBBLE}
          left="86vw"
          variants={bubbleVariants(i)}
          animate="animate"
        />
      ))}
      {/* 네 번째 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Bubble
          key={i * 10}
          src={BUBBLE}
          left="93vw"
          variants={bubbleVariants(i)}
          animate="animate"
        />
      ))}
    </>
  );
}

export default Bubbles;
