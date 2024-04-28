import * as React from 'react';
import { useEffect, useState } from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import rabbit from '../assets/images/home/rabbit.png';
import Seo from '../components/Seo';

const Wrapper = styled.div`
  height: 100vh;
  background: ${(props) => props.theme.home.bgColor};
`;

const Login = styled.img`
  width: 3vw;
  min-width: 50px;
  aspect-ratio: 1 / 1;
  margin-top: 10px;
  margin-right: 10px;
  position: relative;
  z-index: 99;
`;

const Title = styled.h1`
  color: white;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 9vw;
  font-weight: bold;
  margin-bottom: 40px;
  position: relative;
  top: -5%;
  z-index: 90;
`;

const CategoryWrapper = styled.main`
  display: flex;
  width: 100%;
`;

const Category = styled(motion.button)`
  width: 100%;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 99;
`;

const Mushroom = styled.img`
  width: 90%;
  cursor: pointer;
`;

const PageLabel = styled.h2`
  position: absolute;
  bottom: 17%;
  font-size: 2.1vw;
  font-family: 'LeeSeoyun', sans-serif;
  cursor: pointer;
  color: ${(props) => props.theme.home.textColor};
`;

export const BackgroundWrapper = styled.div`
  width: 100vw;
`;

const Butterfly = styled(motion.img)<{ top: string; left: string }>`
  position: absolute;
  width: 7%;
  top: ${(props) => props.top};
  left: ${(props) => props.left};

  @media (max-width: 1100px) {
    top: ${(props) => (props.top === '24%' ? '10%' : props.top)};
  }

  @media (max-width: 768px) {
    top: ${(props) => (props.top === '24%' ? '15%' : props.top)};
  }
`;

export const Grass = styled.div<{ src: string }>`
  max-height: 200px;
  width: 100%;
  aspect-ratio: 1/ 3;
  position: absolute;
  bottom: 0;
  background-image: url(${(props) => props.src});
  background-position: center center;
  background-repeat: repeat-x;
  display: flex;
  justify-content: space-around;
`;

export const Flowers = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const FlowerFirstRow = styled.div`
  width: 100%;
  margin-bottom: -2.5%;
  display: flex;
  justify-content: space-between;
`;

export const FlowerSecondRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5%;
`;

export const Flower = styled.img<{ transform: string }>`
  width: 8%;
  max-width: 120px;
  transform: ${(props) => props.transform};
`;

interface IMushroomState {
  profile: string;
  skills: string;
  projects: string;
  contact: string;
}

enum CategoryText {
  PROFILE = 'profile',
  SKILLS = 'skills',
  PROJECT = 'projects',
  CONTACT = 'contact',
}

const mushroomVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

const Home = () => {
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  const butterflyVariants = {
    left: {
      x: [0, -innerWidth],
      transition: { repeat: Infinity, duration: 15 },
    },
    right: {
      x: [0, innerWidth],
      transition: { repeat: Infinity, duration: 13 },
    },
  };

  const {
    grass,
    butterfly1,
    butterfly2,
    mushroom,
    mushroomHover,
    flower1,
    flower2,
    flower3,
    flower4,
    flower5,
  } = useStaticQuery(graphql`
    query HomeImage {
      grass: file(relativePath: { eq: "home/grass.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      butterfly1: file(relativePath: { eq: "home/butterfly1.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      butterfly2: file(relativePath: { eq: "home/butterfly2.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mushroom: file(relativePath: { eq: "home/mushroom.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mushroomHover: file(relativePath: { eq: "home/mushroom-hover.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      flower1: file(relativePath: { eq: "home/flower1.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      flower2: file(relativePath: { eq: "home/flower2.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      flower3: file(relativePath: { eq: "home/flower3.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      flower4: file(relativePath: { eq: "home/flower4.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      flower5: file(relativePath: { eq: "home/flower5.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const [mushroomImg, setMushroomImg] = useState<IMushroomState>({
    [CategoryText.PROFILE]: mushroom.childImageSharp.fluid.src,
    [CategoryText.SKILLS]: mushroom.childImageSharp.fluid.src,
    [CategoryText.PROJECT]: mushroom.childImageSharp.fluid.src,
    [CategoryText.CONTACT]: mushroom.childImageSharp.fluid.src,
  });

  const onLoginClick = () => {
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin === 'Y') {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  const onMushroomHover = (category: string) =>
    setMushroomImg((prev) => {
      return {
        ...prev,
        [category]: mushroomHover.childImageSharp.fluid.src,
      };
    });
  const onMushroomInitial = (category: string) =>
    setMushroomImg((prev) => {
      return {
        ...prev,
        [category]: mushroom.childImageSharp.fluid.src,
      };
    });

  const onMushroomClick = (category: string) => {
    navigate(`/${category}`);
  };

  return (
    <Wrapper className="align-center">
      <div className="align-right">
        <Login src={rabbit} alt="rabbit" onClick={onLoginClick} />
      </div>
      <Butterfly
        src={butterfly2.childImageSharp.fluid.src}
        top="0"
        left="90%"
        variants={butterflyVariants}
        animate="left"
      />
      <Title className="font-fairy-tail">Hyowon's Portfolio</Title>
      <Butterfly
        src={butterfly1.childImageSharp.fluid.src}
        top="24%"
        left="0"
        variants={butterflyVariants}
        animate="right"
      />
      <CategoryWrapper>
        <Category
          variants={mushroomVariants}
          whileHover="hover"
          className="transform-center-left"
        >
          <Mushroom
            src={mushroomImg[CategoryText.PROFILE]}
            onMouseEnter={() => onMushroomHover(CategoryText.PROFILE)}
            onMouseLeave={() => onMushroomInitial(CategoryText.PROFILE)}
            onClick={() => onMushroomClick(CategoryText.PROFILE)}
          ></Mushroom>
          <PageLabel
            onMouseEnter={() => onMushroomHover(CategoryText.PROFILE)}
            onMouseLeave={() => onMushroomInitial(CategoryText.PROFILE)}
          >
            Profile
          </PageLabel>
        </Category>
        <Category variants={mushroomVariants} whileHover="hover">
          <Mushroom
            src={mushroomImg[CategoryText.SKILLS]}
            onMouseEnter={() => onMushroomHover(CategoryText.SKILLS)}
            onMouseLeave={() => onMushroomInitial(CategoryText.SKILLS)}
            onClick={() => onMushroomClick(CategoryText.SKILLS)}
          />
          <PageLabel
            onMouseEnter={() => onMushroomHover(CategoryText.SKILLS)}
            onMouseLeave={() => onMushroomInitial(CategoryText.SKILLS)}
          >
            Skills
          </PageLabel>
        </Category>
        <Category variants={mushroomVariants} whileHover="hover">
          <Mushroom
            src={mushroomImg[CategoryText.PROJECT]}
            onMouseEnter={() => onMushroomHover(CategoryText.PROJECT)}
            onMouseLeave={() => onMushroomInitial(CategoryText.PROJECT)}
            onClick={() => onMushroomClick(CategoryText.PROJECT)}
          />
          <PageLabel
            onMouseEnter={() => onMushroomHover(CategoryText.PROJECT)}
            onMouseLeave={() => onMushroomInitial(CategoryText.PROJECT)}
          >
            Projects
          </PageLabel>
        </Category>
        <Category
          variants={mushroomVariants}
          whileHover="hover"
          className="transform-center-right"
        >
          <Mushroom
            src={mushroomImg[CategoryText.CONTACT]}
            onMouseEnter={() => onMushroomHover(CategoryText.CONTACT)}
            onMouseLeave={() => onMushroomInitial(CategoryText.CONTACT)}
            onClick={() => onMushroomClick(CategoryText.CONTACT)}
          />
          <PageLabel
            onMouseEnter={() => onMushroomHover(CategoryText.CONTACT)}
            onMouseLeave={() => onMushroomInitial(CategoryText.CONTACT)}
          >
            Contact
          </PageLabel>
        </Category>
      </CategoryWrapper>
      <BackgroundWrapper>
        <Grass src={grass.childImageSharp.fluid.src} />
        <Flowers>
          <FlowerFirstRow>
            <Flower
              src={flower1.childImageSharp.fluid.src}
              transform="matrix(-1, 0, 0, 1, 0, 0)"
            />
            <Flower
              src={flower3.childImageSharp.fluid.src}
              transform="matrix(-1, 0, 0, 1, 0, 0)"
            />
            <Flower
              src={flower5.childImageSharp.fluid.src}
              transform="matrix(-1, 0, 0, 1, 0, 0)"
            />
          </FlowerFirstRow>
          <FlowerSecondRow>
            <Flower src={flower2.childImageSharp.fluid.src} transform="" />
            <Flower src={flower4.childImageSharp.fluid.src} transform="" />
          </FlowerSecondRow>
        </Flowers>
      </BackgroundWrapper>
    </Wrapper>
  );
};

export default Home;

export const Head = () => <Seo />;
