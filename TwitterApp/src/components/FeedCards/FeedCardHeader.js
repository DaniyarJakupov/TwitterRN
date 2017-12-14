// @flow
import React from 'react';
import styled from 'styled-components/native';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const Wrapper = styled.View`
  height: 50;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
const AvatarWrapper = styled.View`
  flex: 0.2;
  align-self: stretch;
  justify-content: center;
`;
const MetaWrapper = styled.View`
  flex: 1;
  align-self: stretch;
`;
const Avatar = styled.Image`
  width: 40;
  height: 40;
  border-radius: 20;
`;

const MetaTopContainer = styled.View`
  flex: 1;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const MetaBottomContainer = styled.View`
  flex: 0.8;
  align-self: stretch;
  align-items: flex-start;
  justify-content: center;
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

const FeedCardHeader = ({ user: { firstName, lastName, username, avatar }, createdAt }) => (
  <Wrapper>
    <AvatarWrapper>
      <Avatar source={{ uri: avatar }} />
    </AvatarWrapper>

    <MetaWrapper>
      <MetaTopContainer>
        <MetaFullName>
          {firstName} {lastName}
        </MetaFullName>
        <MetaText style={{ marginLeft: 5 }}>@{username}</MetaText>
      </MetaTopContainer>

      <MetaBottomContainer>
        <MetaText>{distanceInWordsToNow(createdAt)} ago</MetaText>
      </MetaBottomContainer>
    </MetaWrapper>
  </Wrapper>
);

export default FeedCardHeader;
