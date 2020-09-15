import React, { useState, useEffect } from 'react';

import './styles.css';
import api from '../../services/api';

export default function Exception() {
  const [data, setData] = useState([]);

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  async function getData() {
    const { data } = await api.get('/exception');

    setData(data);
  }

  async function addException() {
    await api.post('/exception', {
      from,
      to,
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className='form'>
        <div className='field'>
          <label>From: </label>
          <input
            type='text'
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </div>
        <div className='field'>
          <label>To: </label>
          <input type='text' value={to} onChange={e => setTo(e.target.value)} />
        </div>

        <button onClick={addException}>Submit</button>
      </div>

      <div className='data'>
        {data.map(exception => (
          <div className='exception'>
            <span>From: {exception.from}</span>
            <span>To: {exception.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
