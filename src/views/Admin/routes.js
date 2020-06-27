import Institute from 'views/InstitutePage';
import Profile from 'views/Profile';
import Contacts from 'views/Contacts';
import MyBooks from 'views/MyBooks';
import BooksWishlist from 'views/BooksWishlist';
import Combinacoes from 'views/CombinationsPage';

export const dashRoutes = [
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
    component: MyBooks,
    layout: '/minha-conta',
    sidebar: true
  },
  {
    path: '/livros-desejados',
    name: 'Livros que eu quero',
    icon: 'collections_bookmark',
    component: BooksWishlist,
    layout: '/minha-conta',
    sidebar: true
  },
  {
    path: '/contatos',
    name: 'Contatos',
    icon: 'contacts',
    component: Contacts,
    layout: '/minha-conta',
    sidebar: true
  },
  {
    path: '/meu-perfil',
    name: 'Meu perfil',
    icon: 'account_circle',
    component: Profile,
    layout: '/minha-conta',
    sidebar: true
  }
];
