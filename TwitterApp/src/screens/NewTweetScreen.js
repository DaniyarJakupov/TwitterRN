// @flow
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '../utils/constants';

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
  background-color: ${props => props.theme.PRIMARY};
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

          <TweetBtn>
            <Text>Tweet</Text>
          </TweetBtn>
        </Container>
      </Wrapper>
    );
  }
}

export default NewTweetScreen;
