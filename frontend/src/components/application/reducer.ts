
import { postType, actionType } from './types';



export const reducerPosts = (state: postType[]=[], action:actionType) => {
    switch (action.type) {

        case 'setPosts':
            return action.posts;

        case 'createPost':
            let nameIsUsed = state.find((post) => post.name === action.post.name) !== undefined;
            if (!nameIsUsed) {
                return [...state, action.post];
            }
            alert(`El nombre ${action.post.name} ya está en uso.`);
            return state;

        case 'updatePost':
            return state.map((post) => {
                if (post.name === action.post.name) {
                    return {name: post.name, description: action.post.description}
                }
                return post
            });

        case 'deletePost':
            return state.filter(post => post.name !== action.name);

        default:
            return state

    }
}



