import React from 'react';
import { Provider } from './components/application/postsProvider';
import Table from './components/table';


function App() {
    return (
        <Provider>
            <Table />
        </Provider>
    );
}

export default App;
