
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

    const savePosts = async () => {
        await fetch(process.env.REACT_APP_BACKEND_URL + '/api/set', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({posts: posts})
        });

        alert('Guardado con éxito');
    }

    return (
        <form onSubmit={createPost}>
            <table>
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
                    {posts.map((post:postType) => <Post key={post.name} name={post.name} description={post.description} />)}
                    <tr>
                        <td>
                            <textarea name='newName' placeholder='Nuevo nombre'></textarea>
                        </td>
                        <td>
                            <textarea name='newDescription' placeholder='Nueva descripción'></textarea>
                        </td>
                        <td>
                            <button className={styles['button-create']}>Agregar fila</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

