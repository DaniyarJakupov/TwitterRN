import React from 'react';
import styled from 'styled-components/native';

const AVATAR_SIZE = 60;

const Wrapper = styled.View`
  height: 140;
  width: 100%;
  padding-top: 50;
  background-color: #fff;
`;

const Heading = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15;
  padding-top: 5;
`;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_SIZE / 2};
`;

const UsernameContainer = styled.View`
  flex: 1;
  padding-left: 10;
  align-self: stretch;
`;

const FullName = styled.Text`
  color: ${props => props.theme.SECONDARY};
  font-weight: bold;
  font-size: 18;
`;

const UserName = styled.Text`
  color: ${props => props.theme.SECONDARY};
  font-size: 15;
  opacity: 0.8;
`;

const MetaContainer = styled.View`
  flex: 0.8;
  flex-direction: row;
`;

const MetaBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MetaText = styled.Text`
  color: ${props => props.theme.SECONDARY};
  font-size: 16;
  font-weight: 600;
`;

const MetaTextNumber = styled.Text`
  color: ${props => props.theme.PRIMARY};
`;

const ProfileHeader = ({ firstName, lastName, avatar, username }) => (
  <Wrapper>
    <Heading>
      <Avatar source={{ uri: avatar }} />

      <UsernameContainer>
        <FullName>
          {firstName} {lastName}
        </FullName>
        <UserName>@{username}</UserName>
      </UsernameContainer>
    </Heading>

    <MetaContainer>
      <MetaBox style={{ paddingLeft: 30 }}>
        <MetaText>
          <MetaTextNumber>3</MetaTextNumber> tweets
        </MetaText>
      </MetaBox>

      <MetaBox>
        <MetaText>
          <MetaTextNumber>3</MetaTextNumber> likes
        </MetaText>
      </MetaBox>
    </MetaContainer>
  </Wrapper>
);

export default ProfileHeader;
