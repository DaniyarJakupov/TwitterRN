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
`;
const Text = styled.Text``;
const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-horizontal: 32;
`;

const ButtonText = styled.Text`
  font-size: 14;
  font-weight: 500;
  color: ${props => props.theme.LIGHT_GRAY};
`;

const favoriteCount = 3;
const isFavorited = false;

const FeedCardFooter = () => (
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
