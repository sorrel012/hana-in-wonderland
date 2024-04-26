import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import github from '../../assets/images/projects/github.png';
import site from '../../assets/images/projects/site.png';
import flag from '../../assets/images/projects/flag.png';

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
  display: inline-block;
  font-size: 1.6vw;
  margin-top: 1.5%;
  line-height: 1.3;
  color: #79422f;
  background-color: ${(props) => props.theme.projects.wrapperBgColor};
  border-radius: 10px;
  padding: 1% 2%;
  margin-right: 1%;
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

const Github = styled.a`
  margin-left: 3%;
`;

const Deployment = styled.a``;

interface IProject {
  name: string;
  periodCnt: string;
  frontSkills: string[];
  backSkills: string[];
  pic: { gatsbyImageData: {} };
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
      {projects &&
        projects.map((project: IProject) => (
          <Wrapper key={project.name}>
            <Title>{project.name}</Title>
            <ImageContainer>
              <GatsbyImage
                image={project?.pic?.gatsbyImageData as any}
                alt={project.name}
                className="pic-project"
              />
            </ImageContainer>
            <Content>
              <Period>
                <Label>
                  <LabelImg src={flag} alt="flag" />
                  <LabelText>기간</LabelText>
                </Label>
                <PeriodText>{project.periodCnt}</PeriodText>
              </Period>
              <Skills>
                <Label>
                  <LabelImg src={flag} alt="flag" />
                  <LabelText>주요 기술</LabelText>
                </Label>
                <ul>
                  {project.frontSkills.map((skill) => (
                    <Text>{skill}</Text>
                  ))}
                  {project.backSkills.map((skill) => (
                    <Text>{skill}</Text>
                  ))}
                </ul>
              </Skills>
              {/*  <Overview>*/}
              {/*    <Label>*/}
              {/*      <LabelImg src={flag} alt="flag" />*/}
              {/*      <LabelText>주요 기능</LabelText>*/}
              {/*    </Label>*/}
              {/*    <ProjectFnItem {...{ projectName: project.projectName }} />*/}
              {/*  </Overview>*/}
              {/*  <TroubleShooting>*/}
              {/*    <Label>*/}
              {/*      <LabelImg src={flag} alt="flag" />*/}
              {/*      <LabelText>문제 해결</LabelText>*/}
              {/*    </Label>*/}
              {/*    <ProjectTbStItem {...{ projectName: project.projectName }} />*/}
              {/*  </TroubleShooting>*/}
            </Content>
            <Links>
              {project.deployPath !== 'x' && (
                <Deployment href={project.deployPath} target="_blank">
                  <LogoImg src={site} alt="deploy" />
                </Deployment>
              )}
              <Github href={project.githubPath} target="_blank">
                <LogoImg src={github} alt="github" />
              </Github>
            </Links>
          </Wrapper>
        ))}
    </>
  );
}

export default ProjectItem;
