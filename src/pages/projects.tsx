import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Project from '../components/project/Project';

const Wrapper = styled.main`
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.projects.bgColor};
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 10%;
  position: relative;
`;

const Turtle = styled(motion.div)`
  width: 10%;
  position: absolute;
  left: 5%;
  opacity: 0;
`;

const Rabbit = styled(motion.div)`
  width: 10%;
  position: absolute;
  right: 5%;
  top: 0;
  z-index: 99;
  opacity: 0;
`;

function Projects() {
  const scrollRef = useRef<HTMLElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const turtleRef = useRef<HTMLDivElement>(null);
  const [moveRange, setMoveRange] = useState<number>(0);

  const { turtle, rabbit, rest } = useStaticQuery(graphql`
    query ProjectImage {
      turtle: file(relativePath: { eq: "projects/project-turtle.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      rabbit: file(relativePath: { eq: "projects/project-rabbit.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      rest: file(relativePath: { eq: "projects/rest.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateMoveRange();
    });

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => {
      if (projectRef.current) {
        observer.unobserve(projectRef.current);
      }
    };
  }, []);

  const updateMoveRange = () => {
    if (projectRef.current && turtleRef.current) {
      const projectHeight = projectRef.current.offsetHeight;
      const turtleHeight = turtleRef.current.offsetHeight;
      setMoveRange(projectHeight - turtleHeight);
    }
  };

  const turtleVariants = {
    scroll: {
      y: [0, moveRange],
      opacity: 1,
      transition: { y: { duration: 30, delay: 1 }, opacity: { duration: 1 } },
    },
  };

  const rabbitVariants = {
    scroll: {
      y: [100, moveRange / 1.36],
      opacity: 1,
      transition: { y: { duration: 15, delay: 1 }, opacity: { duration: 1 } },
    },
  };

  return (
    <Wrapper ref={scrollRef}>
      <Header category="projects" />
      <Turtle ref={turtleRef} variants={turtleVariants} animate="scroll">
        <GatsbyImage
          image={getImage(turtle.childImageSharp)!}
          alt="turtle"
          className="pic-turtle-rabbit"
        />
      </Turtle>
      <div ref={projectRef}>{<Project />}</div>
      <Rabbit variants={rabbitVariants} animate="scroll">
        <GatsbyImage
          image={getImage(rabbit.childImageSharp)!}
          alt="rabbit"
          className="pic-turtle-rabbit"
        />
      </Rabbit>
      <GatsbyImage
        image={getImage(rest.childImageSharp)!}
        alt="rest"
        className="pic-rest"
        style={{ top: moveRange / 1.4 }}
      />
    </Wrapper>
  );
}

export default Projects;
