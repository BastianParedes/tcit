import React from 'react';

export let Context: any = React.createContext([]);



export const Provider = (props: {children: React.ReactNode}) => {
    let [posts, setPosts] = React.useState([]);

    return (            
        <Context.Provider value={{posts, setPosts}}>
            {props.children}
        </Context.Provider>
    );
}