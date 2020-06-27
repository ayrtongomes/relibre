import Institute from 'views/InstitutePage';
import Combinacoes from 'views/CombinationsPage';

export const dashRoutes = [
  {
    path: '/meu-perfil',
    name: 'Meu perfil',
    icon: 'account_circle',
    component: Institute,
    layout: '/minha-conta',
    sidebar: true
  },
  {
    path: '/combinacoes',
    name: 'Combinações',
    icon: 'group',
    component: Combinacoes,
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
    icon: 'collections_bookmark',
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
