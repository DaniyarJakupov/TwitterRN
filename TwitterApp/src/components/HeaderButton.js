/* @flow */
import React, { type Node } from 'react';
import styled from 'styled-components/native';

type Props = {
  onPress?: Function,
  children?: Node,
  side?: 'left' | 'right',
};

const Touchable = styled.TouchableOpacity`
  margin-left: ${props => (props.side === 'left' ? 15 : 0)};
  margin-right: ${props => (props.side === 'right' ? 15 : 0)};
  justify-content: center;
  align-items: center;
`;

const HeaderButton = ({ children, onPress, side = 'left', disabled }: Props) => (
  <Touchable onPress={onPress} disabled={disabled} side={side}>
    {children}
  </Touchable>
);

export default HeaderButton;
