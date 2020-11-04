import fetch from 'isomorphic-unfetch';

export default async function(apiPath, init) {
  const resp = await fetch(apiPath, {
    ...init,
    headers: {
      //'Accept-Language': 'pt-br',
      ...(init.headers ? init.headers : {})
    }
  });

  if (resp.status >= 400) {
    if (resp.status === 401) {
      localStorage.setItem('@relibre:user', '');
      window.location.href = '/login';
    }

    try {
      const errors = await resp.json();
      return errors;
    } catch (error) {
      return {
        errors: [{ message: 'Usuário não autenticado' }]
      };
    }
  }

  try {
    const data = await resp.json();

    return {
      data
    };
  } catch (error) {
    return {};
  }
}
