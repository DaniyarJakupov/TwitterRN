import React, { Component } from 'react';
import styled from 'styled-components/native';

import FeedCard from '../components/FeedCards/FeedCard';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 5;
`;

const ScrollView = styled.ScrollView``;

class HomeScreen extends Component {
  state = {};
  render() {
    return (
      <Wrapper>
        <ScrollView>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default HomeScreen;
