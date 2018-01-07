// @flow
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors } from '../utils/constants';

import CREATE_TWEET_MUTATION from '../graphql/mutation/createTweet'; // graphql mutation
import GET_TWEETS_QUERY from '../graphql/queries/getTweets'; // graphql query

const Wrapper = styled.View`
  background-color: ${props => props.theme.WHITE};
  flex: 1;
  align-items: center;
`;
const Container = styled.View`
  height: 80%;
  width: 90%;
  padding-top: 5;
  position: relative;
`;
const Input = styled.TextInput`
  height: 45%;
  width: 100%;
  font-size: 18;
  color: ${props => props.theme.SECONDARY};
`;
const TweetBtn = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 60%;
  width: 80;
  height: 40;
  border-radius: 20;
  justify-content: center;
  align-items: center;
  shadow-opacity: 0.4;
  shadow-radius: 5;
  shadow-offset: 0px 4px;
  shadow-color: #000;
  elevation: 2;
`;
const Text = styled.Text`
  color: #fff;
`;
const CountText = styled.Text`
  font-size: 18;
  color: ${props => props.theme.PRIMARY};
  position: absolute;
  right: 5%;
  top: 45%;
`;

class NewTweetScreen extends Component {
  state = {
    text: '',
  };

  onChangeText = text => {
    this.setState({ text });
  };

  onTweetSend = async () => {
    Keyboard.dismiss();

    const { text } = this.state;
    const { user } = this.props;
    try {
      await this.props.mutate({
        variables: { text },
        optimisticResponse: {
          __typename: 'Mutation',
          createTweet: {
            __typename: 'Tweet',
            _id: Math.floor(Math.random() * -1000000),
            text: this.state.text,
            likeCount: 0,
            createdAt: new Date(),
            isLiked: false,
            user: {
              __typename: 'User',
              avatar: user.avatar,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          },
        },
        update: (store, { data: { createTweet } }) => {
          // Read the data from our cache. (array of tweets fetched in HomeScreen)
          const data = store.readQuery({ query: GET_TWEETS_QUERY });
          // If new tweet doesn't exist in GET_TWEETS_QUERY from HomeScreen, add new tweet to it
          if (!data.getTweets.find(tweet => tweet._id === createTweet._id)) {
            store.writeQuery({
              query: GET_TWEETS_QUERY,
              data: { getTweets: [{ ...createTweet }, ...data.getTweets] },
            });
          }
        },
      });
    } catch (error) {
      throw error;
    }

    this.props.navigation.goBack(null); // navigate back to HomeScreen
  };

  isDisabled() {
    const { text } = this.state;
    return text.length < 1;
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <Input
            value={this.state.text}
            onChangeText={this.onChangeText}
            multiline
            maxLength={280}
            selectionColor={colors.PRIMARY}
            placeholder="What's happening?"
            autoFocus
          />

          <CountText>{280 - this.state.text.length}</CountText>

          <TweetBtn
            onPress={this.onTweetSend}
            disabled={this.isDisabled()}
            style={
              this.isDisabled()
                ? { backgroundColor: colors.LIGHT_GRAY }
                : { backgroundColor: colors.PRIMARY }
            }
          >
            <Text>Tweet</Text>
          </TweetBtn>
        </Container>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.info,
});

export default compose(graphql(CREATE_TWEET_MUTATION), connect(mapStateToProps))(NewTweetScreen);
