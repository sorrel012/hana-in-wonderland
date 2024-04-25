import React, { useEffect, useState } from 'react';
import seashell2 from '../../assets/images/profile/seashell2.png';
import { Label, Logo, Row, Text } from './ProfileMain';
import styled from 'styled-components';
import Seaweeds from '../../components/profile/Seaweeds';
import Bubbles from '../../components/profile/Bubbles';
import { graphql, useStaticQuery } from 'gatsby';
import { Period } from './ProfileEdu';
import CareerProjectItem from './CareerProjectItem';

const Wrapper = styled.main`
  background: ${(props) => props.theme.profile.bgColor};
  height: 100vh;
  width: 100vw;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Career = styled.section`
  width: 70%;
  background-color: ${(props) => props.theme.profile.boxColor};
  border-radius: 20px;
  padding: 30px 40px 20px 30px;
  z-index: 99;
  margin-bottom: 5vh;
`;

const CareerContent = styled.div`
  padding-left: 5%;
`;

const Company = styled.div`
  font-weight: bold;
  font-size: 1.8vw;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
`;

const CompanyName = styled.div`
  flex: 10;
  margin-left: 8.5vw;
`;

const Project = styled.div`
  padding-left: 3%;
`;

interface ICareer {
  company: string;
  period: string;
  project: string[];
  order: number;
}

function ProfileHistory() {
  const [careers, setCareers] = useState<ICareer[]>();
  const data = useStaticQuery<Queries.ProfileHistoryQuery>(graphql`
    query ProfileHistory {
      allContentfulCareer {
        edges {
          node {
            company
            period
            project
          }
        }
      }
    }
  `);

  useEffect(() => {
    const newCareers: ICareer[] = data.allContentfulCareer.edges.map(
      (career: any) => {
        const { period, company, order, project } = career.node;
        return { period, company, order, project };
      },
    );
    setCareers(newCareers);
  }, [data]);

  return (
    <Wrapper>
      <Career>
        <Row>
          <Label>
            <Logo src={seashell2} alt="seashell" />
            <Text custom="red">경력</Text>
          </Label>
        </Row>
        {careers &&
          careers.map((career: ICareer) => (
            <CareerContent key={career.company}>
              <Company>
                <Period>◾ {career.period}</Period>
                <CompanyName>{career.company}</CompanyName>
              </Company>
              <Project>
                <CareerProjectItem {...{ project: career.project }} />
              </Project>
            </CareerContent>
          ))}
      </Career>
      <Seaweeds />
      <Bubbles />
    </Wrapper>
  );
}

export default ProfileHistory;
