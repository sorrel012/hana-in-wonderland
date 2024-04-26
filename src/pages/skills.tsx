import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Wrapper = styled.main`
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.skills.bgColor};
`;

const Sun = styled.h2`
  position: absolute;
  top: 5%;
  left: 14%;
`;

const TreeWrapper = styled.section`
  position: absolute;
  bottom: -2%;
  right: 30%;
`;

const Apple = styled(motion.div)`
  position: absolute;
  width: 50%;
  top: 32%;
  left: 2%;
`;

const AppleImg = styled(motion.div)`
  width: 65%;
  transform: rotate(-20deg);
  cursor: pointer;
`;

const Peach = styled(motion.div)`
  position: absolute;
  top: 45%;
  left: 60%;
`;

const PeachImg = styled(motion.div)`
  width: 65%;
  transform: rotate(15deg);
  cursor: pointer;
`;

const Orange = styled(motion.div)`
  position: absolute;
  top: 8%;
  left: 47%;
`;

const OrangeImg = styled(motion.div)`
  width: 47%;
  transform: rotate(-3deg);
  cursor: pointer;
`;

const AppleOpen = styled(motion.section)`
  position: absolute;
  width: 25%;
  left: 1.5%;
  bottom: 2%;
  background-color: rgba(204, 47, 52, 0.5);
  border: none;
  border-radius: 50%;
  padding: 30px;
  box-shadow: 8px 6px 15px rgba(119, 26, 29, 0.25);
  text-align: center;
`;

const PeachOpen = styled(motion.section)`
  position: absolute;
  width: 30%;
  right: 5%;
  bottom: 5%;
  background-color: rgba(252, 132, 117, 0.38);
  border: none;
  border-radius: 50%;
  padding: 3%;
  box-shadow: 8px 6px 15px rgba(117, 10, 58, 0.38);
  text-align: center;
`;

const OrangeOpen = styled(motion.section)`
  position: absolute;
  width: 25%;
  bottom: 50%;
  right: 10%;
  background-color: rgba(254, 182, 66, 0.4);
  border: none;
  border-radius: 50%;
  padding: 50px;
  box-shadow: 8px 6px 15px rgba(129, 87, 19, 0.25);
  text-align: center;
`;

const fruitVariants = (degree: string) => ({
  initial: { scale: 1, rotate: `${degree}deg` },
  hover: {
    scale: 1.2,
    rotate: `${Number(degree) - 10}deg`,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 8,
    },
  },
});

interface ISkills {
  gatsbyImageData: {};
}

function Skills() {
  const [isAppleClicked, setIsAppleClicked] = useState(false);
  const [isPeachClicked, setIsPeachClicked] = useState(false);
  const [isOrangeClicked, setIsOrangeClicked] = useState(false);
  const [clients, setClients] = useState<ISkills[]>([]);
  const [servers, setServers] = useState<ISkills[]>([]);
  const [tools, setTools] = useState<ISkills[]>([]);

  const appleRef = useRef<HTMLDivElement>(null);
  const peachRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  const { sun, tree, apple, peach, orange, skills } = useStaticQuery(graphql`
    query Skills {
      sun: file(relativePath: { eq: "skills/sun.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      tree: file(relativePath: { eq: "skills/tree.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      apple: file(relativePath: { eq: "skills/apple.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      peach: file(relativePath: { eq: "skills/peach.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      orange: file(relativePath: { eq: "skills/orange.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      skills: allContentfulSkills {
        edges {
          node {
            front {
              gatsbyImageData(placeholder: NONE)
            }
            back {
              gatsbyImageData(placeholder: NONE)
            }
            tool {
              gatsbyImageData(placeholder: NONE)
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (skills) {
      const nodes = skills.edges[0].node;
      const { front, back, tool } = nodes;
      setClients(front);
      setServers(back);
      setTools(tool);
    }
  }, [skills]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        appleRef.current &&
        !appleRef.current.contains(event.target as Node)
      ) {
        setIsAppleClicked(false);
      }
      if (
        peachRef.current &&
        !peachRef.current.contains(event.target as Node)
      ) {
        setIsPeachClicked(false);
      }
      if (
        orangeRef.current &&
        !orangeRef.current.contains(event.target as Node)
      ) {
        setIsOrangeClicked(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onAppleClick = () => {
    setIsAppleClicked(true);
    setIsPeachClicked(false);
    setIsOrangeClicked(false);
  };
  const onPeachClick = () => {
    setIsPeachClicked(true);
    setIsAppleClicked(false);
    setIsOrangeClicked(false);
  };
  const onOrangeClick = () => {
    setIsOrangeClicked(true);
    setIsAppleClicked(false);
    setIsPeachClicked(false);
  };

  return (
    <Wrapper>
      <Header category="skills" />
      <Sun>
        <GatsbyImage
          image={getImage(sun.childImageSharp)!}
          alt="skills-label"
          className="pic-sun"
        />
      </Sun>
      <AnimatePresence>
        <TreeWrapper>
          <GatsbyImage
            image={getImage(tree.childImageSharp)!}
            alt="skills"
            className="pic-tree"
          />
          <Apple layoutId="apple">
            <AppleImg
              variants={fruitVariants('-20')}
              initial="initial"
              whileHover="hover"
              onClick={onAppleClick}
            >
              <GatsbyImage
                image={getImage(apple.childImageSharp)!}
                alt="back-end"
              />
            </AppleImg>
          </Apple>
          <Peach layoutId="peach">
            <PeachImg
              variants={fruitVariants('15')}
              initial="initial"
              whileHover="hover"
              onClick={onPeachClick}
            >
              <GatsbyImage
                image={getImage(peach.childImageSharp)!}
                alt="front-end"
              />
            </PeachImg>
          </Peach>
          <Orange layoutId="orange">
            <OrangeImg
              variants={fruitVariants('-3')}
              initial="initial"
              whileHover="hover"
              onClick={onOrangeClick}
            >
              <GatsbyImage
                image={getImage(orange.childImageSharp)!}
                alt="tool"
              />
            </OrangeImg>
          </Orange>
        </TreeWrapper>
        {isAppleClicked && (
          <AppleOpen layoutId="apple" ref={appleRef}>
            {servers &&
              servers.map((server: ISkills, index) => (
                <span className="pic-apple">
                  <GatsbyImage
                    key={index}
                    image={server?.gatsbyImageData as any}
                    alt="server-skills"
                  />
                </span>
              ))}
          </AppleOpen>
        )}
        {isPeachClicked && (
          <PeachOpen layoutId="peach" ref={peachRef}>
            {clients &&
              clients.map((client: ISkills, index) => (
                <span className="pic-peach">
                  <GatsbyImage
                    key={index}
                    image={client?.gatsbyImageData as any}
                    alt="client-skills"
                  />
                </span>
              ))}
          </PeachOpen>
        )}
        {isOrangeClicked && (
          <OrangeOpen layoutId="orange" ref={orangeRef}>
            {tools &&
              tools.map((tool: ISkills, index) => (
                <span className="pic-orange">
                  <GatsbyImage
                    key={index}
                    image={tool?.gatsbyImageData as any}
                    alt="tools"
                  />
                </span>
              ))}
          </OrangeOpen>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Skills;
