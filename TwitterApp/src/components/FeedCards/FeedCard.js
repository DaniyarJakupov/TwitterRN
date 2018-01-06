// @flow
import React, { Component } from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader';
import FeedCardFooter from './FeedCardFooter';

const Wrapper = styled.View`
  width: 100%;
  background-color: ${props => props.theme.WHITE};
  shadow-color: ${props => props.theme.SECONDARY};
  shadow-offset: 0px 2px;
  shadow-radius: 2;
  shadow-opacity: 1;
  padding: 7px;
  flex-direction: row;
`;
const LeftContainer = styled.View`
  flex: 0.18;
`;
const RightContainer = styled.View`
  flex: 0.82;
`;
const CardContentWrapper = styled.View`
  flex: 1;
  padding: 0px 20px 10px 0px;
`;
const CardContentText = styled.Text`
  font-size: 14;
  text-align: left;
  font-weight: 400;
  color: ${props => props.theme.SECONDARY};
`;
const AvatarWrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-self: center;
`;
const Avatar = styled.Image`
  width: 50;
  height: 50;
  border-radius: 25;
`;

class FeedCard extends Component {
  state = {
    dimensions: undefined,
  };

  onLayout = event => {
    if (this.state.dimensions) return; // layout was already called
    const { height } = event.nativeEvent.layout;

    this.setState({ dimensions: { height: height + 80 } });
  };

  render() {
    const { text, likeCount, createdAt, user } = this.props;

    return (
      <Wrapper style={this.state.dimensions ? { height: this.state.dimensions.height } : null}>
        <LeftContainer>
          <AvatarWrapper>
            <Avatar source={{ uri: user.avatar }} />
          </AvatarWrapper>
        </LeftContainer>

        <RightContainer>
          <FeedCardHeader user={user} createdAt={createdAt} />

          <CardContentWrapper onLayout={this.onLayout}>
            <CardContentText>{text}</CardContentText>
          </CardContentWrapper>

          <FeedCardFooter likeCount={likeCount} />
        </RightContainer>
      </Wrapper>
    );
  }
}

export default FeedCard;
