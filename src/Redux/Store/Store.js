import { createStore } from 'redux';

import rootReducer from './../Root-Reducer/root-reducer';

const store = createStore ( rootReducer, {} )

export default store;