// @flow
import React from 'react';
import styled from 'styled-components/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { colors } from '../../utils/constants';

const ICON_SIZE = 20;

const Wrapper = styled.View`
  height: 40;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 16;
  font-weight: 400;
  color: ${props => props.theme.LIGHT_GRAY};
  padding-left: 10;
`;

const isFavorited = false;

const FeedCardFooter = ({ favoriteCount }) => (
  <Wrapper>
    <Button>
      <SimpleLineIcons name="bubble" size={ICON_SIZE} color={colors.LIGHT_GRAY} />
      <ButtonText>{favoriteCount}</ButtonText>
    </Button>
    <Button>
      <Entypo name="retweet" color={colors.LIGHT_GRAY} size={ICON_SIZE} />
      <ButtonText>{favoriteCount}</ButtonText>
    </Button>
    <Button>
      <Entypo name="heart" color={isFavorited ? 'red' : colors.LIGHT_GRAY} size={ICON_SIZE} />
      <ButtonText>{favoriteCount}</ButtonText>
    </Button>
  </Wrapper>
);

export default FeedCardFooter;
