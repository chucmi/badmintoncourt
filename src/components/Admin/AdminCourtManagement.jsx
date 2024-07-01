import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const YardForm = () => {
  const [yard, setYard] = useState({
    name: '',
    address: '',
    provinceId: '',
    description: '',
    status: true,
    openTime: '',
    closeTime: '',
    host: null,
    createBy: '',
    updateBy: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/api/yards/${id}`)
        .then(response => setYard(response.data))
        .catch(error => console.error('Error fetching yard:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYard(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/api/yards/${id}`, yard)
        .then(() => navigate('/'))
        .catch(error => console.error('Error updating yard:', error));
    } else {
      axios.post('/api/yards', yard)
        .then(() => navigate('/'))
        .catch(error => console.error('Error adding yard:', error));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Yard' : 'Add Yard'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={yard.name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={yard.address} onChange={handleChange} required />
        </label>
        <label>
          Province ID:
          <input type="number" name="provinceId" value={yard.provinceId} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={yard.description} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={yard.status} onChange={handleChange} required>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </label>
        <label>
          Open Time:
          <input type="time" name="openTime" value={yard.openTime} onChange={handleChange} required />
        </label>
        <label>
          Close Time:
          <input type="time" name="closeTime" value={yard.closeTime} onChange={handleChange} required />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default YardForm;
