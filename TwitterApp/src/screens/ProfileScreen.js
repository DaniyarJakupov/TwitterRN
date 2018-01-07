// @flow
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import ProfileHeader from '../components/ProfileHeader';
import FeedCard from '../components/FeedCards/FeedCard';

import GET_USER_TWEETS from '../graphql/queries/getUserTweets';

const Root = styled.View`
  flex: 1;
`;
const TweetFeed = styled.View`
  flex: 1;
  margin-top: 10;
`;

class ProfileScreen extends Component {
  state = {};

  _renderItem = ({ item }) => <FeedCard {...item} />;

  _renderPlaceholder = () => <FeedCard placeholder isLoaded={this.props.data.loading} />;

  render() {
    const { info, data } = this.props;

    return (
      <Root>
        <ProfileHeader {...info} />

        <TweetFeed>
          {data.loading ? (
            <FlatList
              data={[1, 2, 3]}
              renderItem={this._renderPlaceholder}
              keyExtractor={item => item}
              contentContainerStyle={{ alignSelf: 'stretch' }}
            />
          ) : (
            <FlatList
              data={data.getUserTweets}
              renderItem={this._renderItem}
              keyExtractor={item => item._id}
              contentContainerStyle={{ alignSelf: 'stretch' }}
            />
          )}
        </TweetFeed>
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  info: state.user.info,
});

export default compose(graphql(GET_USER_TWEETS), connect(mapStateToProps))(ProfileScreen);
