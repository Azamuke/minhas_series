import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

const Generos = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        Axios
            .get('/api/genres')
            .then( res => {
                setData(res.data.data)
            })
    }, [])

    const deleteGenero = id => {
        Axios
            .delete('/api/genres/'+id)
            .then(res => {
                const filtrado = data.filter(item => item.id !== id)
                setData(filtrado)
            })
    }

    const editGenero = record => {
        return <Redirect to={'/generos/' + record.id} />
    }

    const renderLine = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
                    <Link to={'/generos/'+ record.id} className='btn btn-secondary'>Editar</Link>
                </td>
            </tr>
        )
    }

    if(data.length === 0){
        return (
            <div className='container'>
                <h1>Gêneros</h1>
                <div className='alert alert-warning' role='alert'>
                    Não há nenhum gênero cadastrado
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Gêneros</h1>
            <Link to='/generos/novo' className='btn btn-secondary'>Novo</Link>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map(renderLine) }
                </tbody>
            </table>
        </div>
    )
}

export default Generos