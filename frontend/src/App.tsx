import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import Table from './components/table';

import { reducerPosts } from './components/application/reducer';

const store = createStore(reducerPosts);

function App() {
    return (
        <Provider store={store}>
            <Table />
        </Provider>
    );
}

export default App;
