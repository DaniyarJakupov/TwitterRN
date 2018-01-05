// @flow
import React from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader';
import FeedCardFooter from './FeedCardFooter';

const Wrapper = styled.View`
  width: 100%;
  min-height: 180;
  background-color: ${props => props.theme.WHITE};
  shadow-color: ${props => props.theme.SECONDARY};
  shadow-offset: 0px 2px;
  shadow-radius: 2;
  shadow-opacity: 0.5;
  padding: 7px;
  margin-vertical: 5;
`;
const CardContentWrapper = styled.View`
  flex: 1;
  padding: 10px 20px 10px 0px;
`;
const CardContentText = styled.Text`
  font-size: 14;
  text-align: left;
  font-weight: 400;
  color: ${props => props.theme.SECONDARY};
`;

const FeedCard = ({ text, favoriteCount, createdAt, user }) => (
  <Wrapper>
    <FeedCardHeader user={user} createdAt={createdAt} />

    <CardContentWrapper>
      <CardContentText>{text}</CardContentText>
    </CardContentWrapper>

    <FeedCardFooter favoriteCount={favoriteCount} />
  </Wrapper>
);

export default FeedCard;
