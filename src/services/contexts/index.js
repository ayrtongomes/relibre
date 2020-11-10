import React from 'react';

// Providers
import { AuthProvider } from '../auth';
import { ContactProvider } from './contact';

const Provider = ({ children }) => <AuthProvider><ContactProvider>{children}</ContactProvider></AuthProvider>;

export default Provider;
