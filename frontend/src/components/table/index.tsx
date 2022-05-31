
import React from 'react';
import Post from '../post';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postType } from '../application/types';



export default function Table() {
    const posts: any = useSelector(state => state); //PORQUE NO SIRVE DARLE EL TIPO postType[]
    const dispatch = useDispatch();

    React.useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/api/read', {method: 'POST'})
        .then(response => response.json())
        .then(json => dispatch({
            type: 'setPosts',
            posts: json.posts
        }));
    }, []);

    const createPost = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (event.currentTarget.newName.value.trim() === '') return;
        dispatch({
            type: 'createPost',
            post: {
                name: event.currentTarget.newName.value,
                description: event.currentTarget.newDescription.value
            }
        })
        event.currentTarget.newName.value = '';
        event.currentTarget.newDescription.value = '';
    }


    const deletePost = (event: React.MouseEvent) => {
        const target = event.target as HTMLInputElement;
        if (target.toString() === '[object HTMLInputElement]') {
            dispatch({
                type: 'deletePost',
                name: target.name
            });
        }
    }

    const savePosts = async () => {
        await fetch(process.env.REACT_APP_BACKEND_URL + '/api/set', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({posts: posts})
        });

        alert('Guardado con éxito');
    }

    return (
        <>
            <form id='formCreator' onSubmit={createPost}></form>
            <table onClick={deletePost}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>
                            <button type="button" onClick={savePosts}>Guardar cambios</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post:postType) => <Post key={post.name} name={post.name} description={post.description}/>)}
                    <tr>
                        <td>
                            <textarea name='newName' form='formCreator' placeholder='Nuevo nombre'></textarea>
                        </td>
                        <td>
                            <textarea name='newDescription' form='formCreator' placeholder='Nueva descripción'></textarea>
                        </td>
                        <td>
                            <button className={styles['button-create']} form='formCreator'>Agregar fila</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

