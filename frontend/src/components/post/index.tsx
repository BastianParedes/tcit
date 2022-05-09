
import React from 'react';
import { FiDelete } from 'react-icons/fi'
import { Context } from '../application/postsProvider';
import styles from './styles.module.css';

type postType = {
    name: string,
    description: string,
}

type contextType = {
    posts: postType[],
    setPosts: Function
}


export default function Post(props: postType) {
    const context: contextType = React.useContext(Context);

    const deletePost = () => {
        context.setPosts((posts:postType[]) => {
            return posts.filter((post:postType) => post.name !== props.name);
        })
    }


    const updatePost = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        context.setPosts((posts:postType[]) => {
            return posts.map((post:postType): postType => {
                if (post.name !== props.name) {
                    return post;
                } else {
                    return {
                        name: props.name,
                        description: event.target.value
                    };
                }
            });
        });
    }

    return(
        <tr>
            <th>{props.name}</th>
            <th>
                <textarea defaultValue={props.description} onBlur={updatePost}></textarea>
            </th>
            <th>
                <button className={styles['button-delete']} onClick={deletePost}><FiDelete /></button>
            </th>
            
        </tr>
    );
}

