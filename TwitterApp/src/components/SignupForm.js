import React, { Component } from 'react';
import { Keyboard, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import { colors, avatar } from '../utils/constants';

import SIGNUP_MUTATION from '../graphql/mutation/signup'; // graphql mutation
import { userLogin } from '../redux/actions'; // redux action

const Wrapper = styled.View`
  flex: 1;
  position: relative;
  justify-content: center;
  align-items: center;
`;
const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;
const BackBtn = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 5%;
  left: 0;
  padding: 15px;
`;
const InputWrapper = styled.View`
  width: 90%;
  height: 50%;
`;
const ConfirmBtn = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 15%;
  width: 70%;
  height: 50;
  border-radius: 10;
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
    loading: false,
  };

  onOutsidePress = () => Keyboard.dismiss();

  onTextChange = (text, type) => {
    this.setState({ [type]: text });
  };

  onConfirmPress = async () => {
    this.setState({ loading: true });

    const { fullName, email, password, username } = this.state;
    // const avatar = 'https://pbs.twimg.com/profile_images/932979502224953344/GSSBn8wF_400x400.jpg';

    try {
      const { data } = await this.props.mutate({
        variables: { fullName, email, password, username, avatar },
      });
      this.setState({ loading: false });
      await AsyncStorage.setItem('@customtwitter', data.signup.token);
      return this.props.userLogin();
    } catch (error) {
      throw error;
    }
  };

  isDisabled() {
    const { fullName, email, password, username } = this.state;
    if (!fullName || !email || !password || !username) {
      return true;
    }
    return false;
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <TouchableWithoutFeedback onPress={this.onOutsidePress}>
        <Wrapper>
          <BackBtn onPress={this.props.onBackPress}>
            <MaterialIcons name="keyboard-backspace" color={colors.WHITE} size={40} />
          </BackBtn>

          <InputWrapper>
            <Sae
              label={'Full Name'}
              labelStyle={{ color: colors.PRIMARY }}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'white'}
              value={this.state.fullName}
              // TextInput props
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={text => this.onTextChange(text, 'fullName')}
            />

            <Sae
              label={'Username'}
              labelStyle={{ color: colors.PRIMARY }}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'white'}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => this.onTextChange(text, 'username')}
            />

            <Sae
              label={'Email'}
              labelStyle={{ color: colors.PRIMARY }}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'white'}
              // TextInput props
              keyboardType="email-address"
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => this.onTextChange(text, 'email')}
            />

            <Sae
              label={'Password'}
              labelStyle={{ color: colors.PRIMARY }}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'white'}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry
              onChangeText={text => this.onTextChange(text, 'password')}
            />
          </InputWrapper>

          <ConfirmBtn
            onPress={this.onConfirmPress}
            disabled={this.isDisabled()}
            style={this.isDisabled() ? { backgroundColor: colors.LIGHT_GRAY } : { backgroundColor: colors.PRIMARY }}
          >
            <ConfirmText style={this.isDisabled() ? { color: '#000' } : { color: '#fff' }}>Signup</ConfirmText>
          </ConfirmBtn>
        </Wrapper>
      </TouchableWithoutFeedback>
    );
  }
}

export default compose(graphql(SIGNUP_MUTATION), connect(undefined, { userLogin }))(SignupForm);
