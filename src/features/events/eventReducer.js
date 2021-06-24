//import {sampleData} from '../../app/api/sampleData'
import {
  CANCEL_CHAT,
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  UPDATE_EVENT,
} from "./eventsConstants";

const initialState = {
    events: [],
    comments: []
};

export default function eventReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };

    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(
            (evt) => evt.id !== payload.id
          ),
          payload,
        ],
      };

      case FETCH_EVENTS:
        return {
          ...state,
          events: payload
        }

    case DELETE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(
            (evt) => evt.id !== payload
          ),
        ],
      };

      case LISTEN_TO_EVENT_CHAT:
        return {
          ...state,
          comments: payload
        }
        case CANCEL_CHAT:
          return {
            ...state,
            comments: []
          }
    default:
      return state;
  }
}
