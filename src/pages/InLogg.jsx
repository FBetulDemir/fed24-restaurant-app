import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import '../styles/InLogg.css';
import { useState } from 'react';
import useAdminStore from '../stores/authorizationStore';

function InLogg() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(null);

  const correctPassword = 'mums';
  const navigate = useNavigate();

  const login = useAdminStore((state) => state.login);


  const schema = Joi.object({
    password: Joi.string().min(4).required(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error: joiError } = schema.validate({ password });

    if (joiError) {
      setError('Minst 4 tecken');
      setIsValid(false);
      return;
    }

    if (password !== correctPassword) {
      setError('Fel lösenord');
      setIsValid(false);
      return;
    }

    // Login success
    setError('');
    setIsValid(true);
    login();

    navigate('/pages/editMenu'); 
  };

  return (
    <section className='blurp'>
      <div className='sign-section'>
        <section className='form'>
          <p className='admin'>Admin</p>

          <input
            className={`input-box ${isValid === true ? 'input-success' : isValid === false ? 'input-error' : ''}`}
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
          {error && <p className="error-inlogg">{error}</p>}

          <form onSubmit={handleSubmit}>
            <button className="ghost-button" type="submit">Logga In</button>
          </form>
        </section>
      </div>
    </section>
  );
}

export default InLogg;
