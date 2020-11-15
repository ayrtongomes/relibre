import Institute from 'views/InstitutePage';
import Profile from 'views/Profile';
import PendingContacts from 'views/PendingContacts';
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
    path: '/meus-livros/:view/:id?',
    name: 'Meus livros',
    icon: 'library_books',
    component: MyBooks,
    layout: '/minha-conta'
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
    path: '/para-aprovacao/contato',
    name: 'Contatos pendentes',
    icon: 'contacts',
    component: PendingContacts,
    layout: '/minha-conta',
    sidebar: true
  },
  {
    path: '/contatos',
    name: 'Contatos aprovados',
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
