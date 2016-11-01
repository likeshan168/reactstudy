import { ADD_TODO } from '../actions/todo';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([state.text]);
        default:
            return state;
    }
}