import React, { Component } from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../utils/constants';

const Wrapper = styled.View`
  flex: 1;
  position: relative;
  justify-content: center;
  align-items: center;
`;
const BackBtn = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 5%;
  left: 5%;
`;
const InputWrapper = styled.View`
  width: 90%;
  height: 40%;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
`;
const TextInput = styled.TextInput`
  height: 40;
  width: 90%;
  border-color: red;
  border-width: 1;
`;
const ConfirmBtn = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 15%;
  width: 70%;
  height: 50;
  border-radius: 10;
  background-color: ${props => props.theme.PRIMARY};
  shadow-opacity: 0.4;
  shadow-radius: 5;
  shadow-offset: 0px 4px;
  shadow-color: #000;
  elevation: 2;
`;
const ConfirmText = styled.Text`
  font-size: 18;
  color: ${props => props.theme.WHITE};
`;

class SignupForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    username: '',
  };

  onNameChange = text => {
    this.setState({ fullName: text });
  };

  render() {
    return (
      <Wrapper>
        <BackBtn onPress={this.props.onBackPress}>
          <MaterialIcons name="keyboard-backspace" color={colors.WHITE} size={40} />
        </BackBtn>

        <InputWrapper>
          <TextInput onChangeText={this.onNameChange} value={this.state.fullName} />
        </InputWrapper>

        <ConfirmBtn>
          <ConfirmText>Signup</ConfirmText>
        </ConfirmBtn>
      </Wrapper>
    );
  }
}

export default SignupForm;
