import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import { userLogout } from '../redux/actions'; // redux action

import Loading from '../components/Loading';

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_RADIUS};
`;
const Touchable = styled.TouchableOpacity`
  margin-left: 15;
  justify-content: center;
  align-items: center;
`;

class HeaderAvatar extends Component {
  state = {};
  onOpenActionSheet = () => {
    const options = ['Logout', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.client.resetStore(); // reset apollo store since user is logedout
          return this.props.userLogout();
        }
      }
    );
  };

  render() {
    const { user } = this.props;
    if (user == null) {
      return (
        <Touchable disabled>
          <Loading size="small" />
        </Touchable>
      );
    }
    return (
      <Touchable onPress={this.onOpenActionSheet}>
        <Avatar source={{ uri: user.avatar }} />
      </Touchable>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.info,
});

export default withApollo(connect(mapStateToProps, { userLogout })(connectActionSheet(HeaderAvatar)));
