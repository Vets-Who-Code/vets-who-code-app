import { combineReducers } from 'redux';
import PodcastsReducer from './podcasts';
import ActivePodcast from './activePodcast';

const rootReducer = combineReducers({
  podcasts: PodcastsReducer,
  activePodcast: ActivePodcast
});

export default rootReducer;
