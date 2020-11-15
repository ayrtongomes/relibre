import React from 'react';
import api from '../api.config';

const ContactContext = React.createContext({});

function ContactProvider(props) {
  const baseEndpoint = `Contact`;

  const fetchContacts = async (type, approved, denied, offset, limit) => {
    const url = buildUrl(type, approved, denied, offset, limit);
    const { data } = await api.get(url, { auth: true });
    return getResults(data);
  };

  const createContact = async payload => {
    const { data } = await api.post(baseEndpoint, {
      auth: true,
      body: payload
    });
    return getResults(data);
  };

  const approveContact = async payload => {
    const { data } = await api.post(baseEndpoint + `/Approve`, {
      auth: true,
      body: payload
    });
    return getResults(data);
  };

  const buildUrl = (type, approved, denied, offset, limit) => {
    let url = baseEndpoint;
    let charToAdd = `?`;
    if (type) {
      url += `${charToAdd}type=${type}`;
      charToAdd = `&`;
    }
    if (approved) {
      url += `${charToAdd}approved=${approved}`;
      charToAdd = `&`;
    }
    if (denied) {
      url += `${charToAdd}denied=${denied}`;
      charToAdd = `&`;
    }
    if (offset) {
      url += `${charToAdd}offset=${offset}`;
      charToAdd = `&`;
    }
    if (limit) {
      url += `${charToAdd}limit=${limit}`;
    }
    return url;
  };

  const getResults = data => {
    if (data) {
      if (data.errors && data.errors.length > 0) return data.errors;

      return data.result;
    }
    return {};
  };

  return (
    <ContactContext.Provider
      value={{
        createContact,
        approveContact,
        fetchContacts
      }}
      {...props}
    />
  );
}

const useContacts = () => React.useContext(ContactContext);

export { ContactProvider, useContacts };
