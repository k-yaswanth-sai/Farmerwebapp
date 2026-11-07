import { createContext, useContext, useState } from 'react';
import { read, write } from './storage';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read('currentUser', null));

  const signup = ({ name, email, password, role }) => {
    const users = read('users', []);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
      return 'An account with this email already exists.';
    const newUser = { name, email, password, role };
    write('users', [...users, newUser]);
    return null;
  };

  const login = (email, password) => {
    const found = read('users', []).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return 'Invalid email or password.';
    const session = { name: found.name, email: found.email, role: found.role };
    write('currentUser', session);
    setUser(session);
    return null;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
}
