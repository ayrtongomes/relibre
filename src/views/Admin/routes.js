import Home from 'views/HomePage';
import Login from 'views/LoginPage';
import Result from 'views/ResultPage';
import Institute from 'views/InstitutePage';

export const dashRoutes = [
  {
    path: '/search',
    name: 'Procurar',
    component: Result,
    layout: '/client'
  }
  // {
  //   path: '/instituicao/page',
  //   name: 'Inst',
  //   component: Institute,
  //   layout: '/client'
  // }
  // {
  //     path: "/login",
  //     name: 'Login',
  //     component: Login,
  //     layout: "/client"
  // },
];
