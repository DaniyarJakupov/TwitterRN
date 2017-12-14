// @flow
import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import { ActivityIndicator, FlatList } from 'react-native';

import FeedCard from '../components/FeedCards/FeedCard';

import GET_TWEETS_QUERY from '../graphql/queries/getTweets';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 5;
`;

class HomeScreen extends Component {
  state = {};

  _renderItem = ({ item }) => <FeedCard {...item} />;

  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Wrapper>
          <ActivityIndicator size="large" />
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={data.getTweets}
          keyExtractor={item => item._id}
          renderItem={this._renderItem}
        />
      </Wrapper>
    );
  }
}

export default graphql(GET_TWEETS_QUERY)(HomeScreen);
