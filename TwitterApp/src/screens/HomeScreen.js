// @flow
import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose, withApollo } from 'react-apollo';
import { ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedCard from '../components/FeedCards/FeedCard';

import { colors } from '../utils/constants';

import GET_TWEETS_QUERY from '../graphql/queries/getTweets'; // graphql query
import GET_ME_QUERY from '../graphql/queries/me'; // graphql query
import { getUserInfo } from '../redux/actions'; // redux action

const Wrapper = styled.View`
  flex: 1;
  padding-top: 5;
`;

class HomeScreen extends Component {
  state = {};

  componentDidMount() {
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: GET_ME_QUERY });
    this.props.getUserInfo(me);
  };

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

        <ActionButton buttonColor={colors.PRIMARY} icon={<Icon size={25} color={colors.WHITE} name="feather" />} onPress={() => console.log('FAB')} />
      </Wrapper>
    );
  }
}

export default withApollo(compose(graphql(GET_TWEETS_QUERY), connect(undefined, { getUserInfo }))(HomeScreen));
