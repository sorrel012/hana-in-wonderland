import React from 'react';
import styled from 'styled-components';
import seaweed from '../../assets/images/profile/seaweed1.png';
import seaweed2 from '../../assets/images/profile/seaweed2.png';

const SeaweedWrapper = styled.div`
  width: 100vw;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;

const Seaweed = styled.img`
  width: 15vw;
`;

function Seaweeds() {
  return (
    <SeaweedWrapper>
      <Seaweed src={seaweed} alt="seaweed" />
      <Seaweed src={seaweed2} alt="seaweed" />
    </SeaweedWrapper>
  );
}

export default Seaweeds;
