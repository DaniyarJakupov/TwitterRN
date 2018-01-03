// @flow
import { router } from '../../Navigation';

export default (state, action) => {
  const newState = router.getStateForAction(action, state);
  return newState || state;
};
