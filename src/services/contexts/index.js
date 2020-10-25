import React from 'react';

// Providers
import { AuthProvider } from '../auth';

const Provider = ({ children }) => <AuthProvider>{children}</AuthProvider>;

export default Provider;
