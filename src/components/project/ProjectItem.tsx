import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

const Wrapper = styled.section`
  width: 90%;
  background: ${(props) => props.theme.projects.contentBgColor};
  border-radius: 30px;
  margin: 0 auto 10px;
  padding: 50px 50px 40px 50px;
  color: #494032;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const Title = styled.h3`
  font-size: 2.3vw;
  font-weight: bold;
  margin-bottom: 3%;
`;

const ImageContainer = styled.div`
  width: 80%;
`;
const Image = styled.img`
  width: 100%;
`;

const Content = styled.section``;

const Label = styled.div`
  display: flex;
  margin-top: 3%;
`;

const LabelImg = styled.img`
  width: 2vw;
  margin-right: 5px;
`;

const LabelText = styled.span`
  font-size: 2vw;
  font-weight: bold;
`;

const Period = styled.section``;

const PeriodText = styled.div`
  font-size: 1.6vw;
  margin-top: 1.5%;
`;

const Skills = styled.section``;

export const Text = styled.li`
  font-size: 1.6vw;
  margin-top: 1.5%;
  line-height: 1.3;
`;

const Overview = styled.section``;

const TroubleShooting = styled.section`
  margin-bottom: 5%;
`;

const Links = styled.div`
  padding-top: 3%;
  text-align: right;
`;

const LogoImg = styled.img`
  width: 8%;
  margin-right: 5px;
  background-color: #79422f;
  padding: 10px;
  border-radius: 50%;
`;

const Github = styled.a``;

const Deployment = styled.a`
  margin-left: 3%;
`;
interface IProject {
  name: string;
  periodCnt: string;
  frontSkills: string[];
  backSkills: string[];
  pic: {};
  githubPath: string;
  deployPath: string;
  order: number;
}

function ProjectItem() {
  const [projects, setProjects] = useState<IProject[]>([]);

  const data = useStaticQuery(graphql`
    query Projects {
      allContentfulProject {
        nodes {
          name
          periodCnt
          frontSkills
          backSkills
          pic {
            gatsbyImageData(placeholder: NONE)
          }
          githubPath
          deployPath
          order
        }
      }
    }
  `);

  useEffect(() => {
    if (data) {
      const newProjects: IProject[] = data.allContentfulProject.nodes;
      newProjects.sort((a, b) => a.order - b.order);
      setProjects(newProjects);
    }
  }, [data]);

  return (
    <>
      {/*{data &&*/}
      {/*  data.map((project: IProject) => (*/}
      {/*    <Wrapper key={project.projectName}>*/}
      {/*      <Title>{project.projectName}</Title>*/}
      {/*      <ImageContainer>*/}
      {/*        <Image*/}
      {/*          src={`${AWS_URL}/${project.projectPic}`}*/}
      {/*          alt={project.projectName}*/}
      {/*        />*/}
      {/*      </ImageContainer>*/}
      {/*      <Content>*/}
      {/*        <Period>*/}
      {/*          <Label>*/}
      {/*            <LabelImg src={flag} alt="flag" />*/}
      {/*            <LabelText>기간</LabelText>*/}
      {/*          </Label>*/}
      {/*          <PeriodText>{project.projectPeriodCnt}</PeriodText>*/}
      {/*        </Period>*/}
      {/*        <Skills>*/}
      {/*          <Label>*/}
      {/*            <LabelImg src={flag} alt="flag" />*/}
      {/*            <LabelText>주요 기술</LabelText>*/}
      {/*          </Label>*/}
      {/*          <ul>*/}
      {/*            <Text>{project.projectFrontSkills}</Text>*/}
      {/*            <Text>{project.projectBackSkills}</Text>*/}
      {/*          </ul>*/}
      {/*        </Skills>*/}
      {/*        <Overview>*/}
      {/*          <Label>*/}
      {/*            <LabelImg src={flag} alt="flag" />*/}
      {/*            <LabelText>주요 기능</LabelText>*/}
      {/*          </Label>*/}
      {/*          <ProjectFnItem {...{ projectName: project.projectName }} />*/}
      {/*        </Overview>*/}
      {/*        <TroubleShooting>*/}
      {/*          <Label>*/}
      {/*            <LabelImg src={flag} alt="flag" />*/}
      {/*            <LabelText>문제 해결</LabelText>*/}
      {/*          </Label>*/}
      {/*          <ProjectTbStItem {...{ projectName: project.projectName }} />*/}
      {/*        </TroubleShooting>*/}
      {/*      </Content>*/}
      {/*      <Links>*/}
      {/*        <Github*/}
      {/*          href="https://github.com/sorrel012/postcard"*/}
      {/*          target="_blank"*/}
      {/*        >*/}
      {/*          <LogoImg src={github} alt="github" />*/}
      {/*        </Github>*/}
      {/*        <Deployment>*/}
      {/*          <LogoImg src={site} alt="deploy" />*/}
      {/*        </Deployment>*/}
      {/*      </Links>*/}
      {/*    </Wrapper>*/}
      {/*  ))}*/}
    </>
  );
}

export default ProjectItem;
