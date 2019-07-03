import { useState } from 'react';
import Router from 'next/router';
import { loginUser } from '../lib/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('Sincere@april.biz');
  const [password, setPassword] = useState('hildegard.org');
  const [error, setError] = useState('');
  const [loading, isLoading] = useState(false);

  const handleSubmit = event => {
    setError('');
    event.preventDefault();
    loginUser(email, password)
      .then(() => Router.push('/profile'))
      .catch(showError);
  };

  const showError = err => {
    console.error(err);
    const error = (err.response && err.response.data) || err.message;
    setError(error);
    isLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button disabled={loading} type="submit">
        {loading ? 'Sending' : 'Submit'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginForm;
