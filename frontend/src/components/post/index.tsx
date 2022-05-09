
import React from 'react';
import { FiDelete } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import { postType } from '../application/types';




export default function Post(props: postType) {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const deletePost = () => {
        dispatch({
            type: 'deletePost',
            name: props.name
        });
    }


    const updatePost = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: 'updatePost',
            post: {
                name: props.name,
                description: event.target.value
            }
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
