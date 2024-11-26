import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

interface ProgramData {
  title: string;
  description: string;
}

export const CreateProgram: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProgram: ProgramData = {
      title,
      description,
    };

    try {
      // Send a POST request to the API to add the new program
      const response = await fetch('http://localhost:4000/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProgram),
      });

      if (!response.ok) {
        throw new Error('Failed to add new program');
      }

      // Optionally, handle the response if needed
      const responseData = await response.json();
      console.log('New program added:', responseData);

      // Navigate back to the Home page (or another page)
      navigate('/');
    } catch (error) {
      console.error('Error adding program:', error);
      alert('There was an error adding the program. Please try again.');
    }
  };

  return (
    <div className="create-program">
      <h2>Have a new program to share?</h2>
      <p>Fill out the form below and see it on the homepage!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Program title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="About this program"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Add Program</button>
      </form>
    </div>
  );
};
