import {combineReducers} from 'redux';
import eventReducer from '../../features/events/eventReducer';
import testReducer from '../../features/sandBox/testReducer';

const rootReducer = combineReducers({
    event: eventReducer,
    test: testReducer
})

export default rootReducer;