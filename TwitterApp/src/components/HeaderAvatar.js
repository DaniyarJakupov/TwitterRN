import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import Loading from '../components/Loading';

import { avatar } from '../utils/constants';

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
  render() {
    const info = false;
    if (!info) {
      return (
        <Touchable disabled>
          <Loading size="small" />
        </Touchable>
      );
    }
    return (
      <Touchable>
        <Avatar source={{ uri: avatar }} />
      </Touchable>
    );
  }
}

export default HeaderAvatar;
