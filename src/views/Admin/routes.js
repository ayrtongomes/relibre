// import Home from 'views/HomePage';
// import Login from 'views/LoginPage';
// import Result from 'views/ResultPage';
import Institute from 'views/InstitutePage';

export const dashRoutes = [
  // {
  //   path: '/search',
  //   name: 'Procurar',
  //   component: Result,
  //   layout: '/client'
  // }
  {
    path: '/meu-perfil',
    name: 'Meu perfil',
    icon: 'account_circle',
    component: Institute,
    layout: '/minha-conta',
    sidebar: true
  },
  {
    path: '/meus-livros',
    name: 'Meus livros',
    icon: 'library_books',
    component: Institute,
    layout: '/minha-conta',
    sidebar: true
  },
  {
    path: '/livros-desejados',
    name: 'Livros que eu quero',
    icon: 'library_books',
    component: Institute,
    layout: '/minha-conta',
    sidebar: true
  },
  {
    path: '/contatos',
    name: 'Contatos',
    icon: 'contacts',
    component: Institute,
    layout: '/minha-conta',
    sidebar: true
  }
  // {
  //     path: "/login",
  //     name: 'Login',
  //     component: Login,
  //     layout: "/client"
  // },
];
