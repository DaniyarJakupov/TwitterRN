import React from 'react';
import styled from 'styled-components/native';

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

const username = 'Dan';
const firstName = 'Daniyar';
const lastName = 'Jakupov';
const createdAt = '2 days ago';

const FeedCardHeader = () => (
  <Wrapper>
    <AvatarWrapper>
      <Avatar source={{ uri: 'https://pbs.twimg.com/profile_images/932979502224953344/GSSBn8wF_400x400.jpg' }} />
    </AvatarWrapper>

    <MetaWrapper>
      <MetaTopContainer>
        <MetaFullName>
          {firstName} {lastName}
        </MetaFullName>
        <MetaText style={{ marginLeft: 5 }}>@{username}</MetaText>
      </MetaTopContainer>

      <MetaBottomContainer>
        <MetaText>{createdAt}</MetaText>
      </MetaBottomContainer>
    </MetaWrapper>
  </Wrapper>
);

export default FeedCardHeader;
