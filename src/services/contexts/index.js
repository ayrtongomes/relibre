import React from 'react';

// Providers
import { AuthProvider } from '../auth';
import { BooksProvider } from './book';
import { ContactProvider } from './contact';

const Provider = ({ children }) => (
  <AuthProvider>
    <BooksProvider>
      <ContactProvider>{children}</ContactProvider>
    </BooksProvider>
  </AuthProvider>
);

export default Provider;
