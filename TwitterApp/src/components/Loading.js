// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '../utils/constants';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function Loading({ size = 'large', color = colors.PRIMARY }) {
  return (
    <Wrapper>
      <ActivityIndicator size={size} color={color} />
    </Wrapper>
  );
}
