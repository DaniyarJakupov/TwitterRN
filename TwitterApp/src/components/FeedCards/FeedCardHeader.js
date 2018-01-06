// @flow
import React from 'react';
import styled from 'styled-components/native';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';

const Wrapper = styled.View`
  height: 30;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
const MetaWrapper = styled.View`
  flex: 1;
  align-self: stretch;
`;

const MetaTopContainer = styled.View`
  flex: 1;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const MetaFullName = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${props => props.theme.SECONDARY};
`;

const MetaText = styled.Text`
  font-size: 14;
  font-weight: 600;
  color: ${props => props.theme.LIGHT_GRAY};
`;

const FeedCardHeader = ({ user: { firstName, lastName, username }, createdAt }) => (
  <Wrapper>
    <MetaWrapper>
      <MetaTopContainer>
        <MetaFullName>
          {firstName} {lastName}
        </MetaFullName>
        <MetaText numberOfLines={1} ellipsizeMode="tail" style={{ marginLeft: 5 }}>
          @{username} &#8226; {distanceInWordsStrict(createdAt, new Date())}
        </MetaText>
      </MetaTopContainer>
    </MetaWrapper>
  </Wrapper>
);

export default FeedCardHeader;
