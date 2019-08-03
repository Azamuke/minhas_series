import React, { useState } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovoGenero = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        Axios.post('/api/genres', {
            name
        })
        .then(res => {
            setSuccess(true)
        })
    }

    if(success){
        return <Redirect to='/generos' />
    }
    return (
        <div className='container'>
            <h1>Novo Gênero</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="genreName">Nome</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="genreName" placeholder="Nome do gênero" />
                    <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default NovoGenero