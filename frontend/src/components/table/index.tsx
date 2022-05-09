
import React from 'react';
import Post from '../post';
import { Context } from '../application/postsProvider';
import styles from './styles.module.css';

type postType = {
    name: string,
    description: string
}

type contextType = {
    posts: postType[],
    setPosts: Function
}

export default function Table() {
    let context: contextType = React.useContext(Context);

    React.useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/api/read', {method: 'POST'})
        .then(response => response.json())
        .then(json => context.setPosts(json.posts));
    }, []);

    const createPost = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let name = event.currentTarget.newName.value;
        let description = event.currentTarget.newDescription.value;
        let nameIsUsed = context.posts.find((post:postType) => post.name === name) !== undefined;
        if (!nameIsUsed) {
            context.setPosts((posts:postType[]) => [...posts, {name, description}]);
            event.currentTarget.newName.value = '';
            event.currentTarget.newDescription.value = '';
        } else {
            alert(`El nombre ${name} ya está en uso.`);
        }
    }

    const savePosts = async () => {
        await fetch(process.env.REACT_APP_BACKEND_URL + '/api/set', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({posts: context.posts})
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
                    {context.posts.map((post:postType) => <Post key={post.name} name={post.name} description={post.description} />)}
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

