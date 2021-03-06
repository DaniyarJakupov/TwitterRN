// @flow
import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, gql } from 'react-apollo';
import Placeholder from 'rn-placeholder';

import FeedCardHeader from './FeedCardHeader';
import FeedCardFooter from './FeedCardFooter';

import LIKE_TWEET_MUTATION from '../../graphql/mutation/likeTweet'; // graphql mutation

const Wrapper = styled.View`
  width: 100%;
  min-height: 100;
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
const Content = styled.View`
  flex: 1;
`;

class FeedCard extends Component {
  state = {
    dimensions: { height: undefined },
  };

  onLayout = event => {
    // layout was already called
    const { height } = event.nativeEvent.layout;
    this.setState({ dimensions: { height } });
  };

  /* GraphQL Mutation */
  onLikePress = async () => {
    const { _id, isLiked, likeCount } = this.props;
    try {
      await this.props.mutate({
        variables: { _id },
        optimisticResponse: {
          __typename: 'Mutation',
          likeTweet: {
            __typename: 'Tweet',
            _id,
            likeCount: isLiked ? likeCount - 1 : likeCount + 1,
            isLiked: !isLiked,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { user, text, likeCount, isLiked, createdAt, placeholder, isLoaded } = this.props;
    if (placeholder) {
      return (
        <Wrapper style={{ minHeight: 140 }}>
          <Placeholder.ImageContent
            onReady={!isLoaded}
            lineNumber={2}
            animate="shine"
            lastLineWidth="40%"
            hasRadius
            size={50}
          />
        </Wrapper>
      );
    }
    return (
      <Wrapper>
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

          <FeedCardFooter likeCount={likeCount} isLiked={isLiked} onLikePress={this.onLikePress} />
        </RightContainer>
      </Wrapper>
    );
  }
}

FeedCard.fragments = {
  tweet: gql`
    fragment FeedCard on Tweet {
      text
      _id
      createdAt
      likeCount
      isLiked
      user {
        username
        avatar
        lastName
        firstName
      }
    }
  `,
};

export default graphql(LIKE_TWEET_MUTATION)(FeedCard);

// {
//   props: ({ ownProps, mutate }) => ({
//     like: () =>
//       mutate({
//         variables: { _id: ownProps._id },
//         optimisticResponse: {
//           __typename: 'Mutation',
//           likeTweet: {
//             __typename: 'Tweet',
//             _id: ownProps._id,
//             likeCount: ownProps.isLiked ? ownProps.likeCount - 1 : ownProps.likeCount + 1,
//             isLiked: !ownProps.isLiked,
//           },
//         },
//       }),
//   }),
// }
