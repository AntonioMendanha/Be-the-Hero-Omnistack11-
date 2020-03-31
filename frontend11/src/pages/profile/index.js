import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import "./styles.css";

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setincidents] = useState([]);
    
    const history = useHistory();

    const ongid = localStorage.getItem('ongid');
    const ongname = localStorage.getItem('ongname');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongid,
            }
        }).then(response => {
            setincidents(response.data);
        })
     }, [ongid]);

     async function handledeleteincident(id) {
         try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongid,
                }
            });    

            setincidents(incidents.filter(incident => incident.id !== id));
         }  catch (err) {
             alert('Erro ao deletar o caso, tente novamente.');
         }
     }

     function handlelogout (){
         localStorage.clear();

         history.push('/');
        }    

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongname}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handlelogout} type="button">
                    <FiPower size={18} color="#e02041" />

                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                { incidents.map( incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>
          
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
          
                        <button onClick={() => handledeleteincident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                  </li>
          
                ))}   
            </ul>
        </div>
    );
}