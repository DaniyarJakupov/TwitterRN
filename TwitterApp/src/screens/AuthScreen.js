// @flow
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import SignupForm from '../components/SignupForm';

const { height } = Dimensions.get('window');

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.SECONDARY};
  position: relative;
`;
const Touchable = styled.TouchableOpacity`
  padding: 25px;
`;
const SignupBtn = styled.TouchableOpacity`
  width: 150;
  height: 75;
  background-color: ${props => props.theme.PRIMARY};
  border-top-left-radius: 20;
  border-bottom-left-radius: 20;
  position: absolute;
  top: ${height * 0.4};
  right: 0;
  justify-content: center;
  align-items: center;
  shadow-opacity: 0.4;
  shadow-radius: 5;
  shadow-offset: 0px 4px;
  shadow-color: #000;
  elevation: 2;
`;
const SignupText = styled.Text`
  font-size: 22;
  font-weight: 700;
  color: ${props => props.theme.WHITE};
`;
const LoginWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200;
  justify-content: center;
  align-items: center;
`;
const LoginText = styled.Text`
  font-size: 18;
  color: ${props => props.theme.WHITE};
`;

class AuthScreen extends Component {
  state = {
    showSignup: true,
  };

  onSignupPress = () => {
    this.setState(prevState => ({
      showSignup: !prevState.showSignup,
    }));
  };

  render() {
    if (this.state.showSignup) {
      return (
        <Wrapper>
          <SignupForm onBackPress={this.onSignupPress} />
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <SignupBtn onPress={this.onSignupPress}>
          <SignupText>Get Started</SignupText>
        </SignupBtn>

        <LoginWrapper>
          <Touchable>
            <LoginText>Already have an account?</LoginText>
          </Touchable>
        </LoginWrapper>
      </Wrapper>
    );
  }
}

export default AuthScreen;
