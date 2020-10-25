import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
import Footer from 'components/Footer/Footer.js';
import Divider from '@material-ui/core/Divider';

import componentsStyle from 'assets/jss/material-kit-react/views/components.js';
import SearchBox from 'components/SearchBox/SearchBox';

const HomePage = ({ classes, ...rest }) => {
  return (
    <div>
      <Header
        brand="relibre"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        {...rest}
      />
      <div className={classes.container}>
        <GridContainer justify="flex-start">
          <GridItem style={{ marginTop: '60px', textAlign: 'left' }}>
            <h2 style={{ textAlign: 'left' }}>Termos de uso</h2>
            <p style={{ fontWeight: 400 }}>
              Bem-vindo à Relibre. Estas condições de uso regem seu acesso e
              uso, como pessoa física, dentro do Brasil, no site de internet e
              serviços disponibilizados pelo Relibre. O serviço Relibre são
              regidos pelas condições abaixo.
            </p>
            <h4 style={{ textAlign: 'left' }}>
              1. Aceitação dos Termos de Uso
            </h4>
            <p style={{ fontWeight: 400 }}>
              Ao acessar e usar os Serviços Relibre você concorda com estas
              condições e termos e com a Política de Privacidade, que
              estabelecem o relacionamento contratual entre você, na qualidade
              de usuário, e o Relibre. Por favor, leia tudo cuidadosamente. Caso
              não concorde com estas condições, não utilize os Serviços Relibre.
              O Relibre poderá imediatamente encerrar estes termos ou quaisquer
              serviços em relação a você ou, de modo geral, deixar de oferecer
              ou negar acesso ao serviço ou a qualquer parte deles, a qualquer
              motivo.
            </p>
            <h4 style={{ textAlign: 'left' }}>2. Qualificação</h4>
            <p style={{ fontWeight: 400 }}>
              Para criar uma conta no Relibre e utilizar o Serviço, você deve
              ter, no mínimo, 18 anos de idade. Ao criar uma conta e utilizar o
              Serviço, você declara e garante que:
              <ul>
                <li>Você pode firmar um contrato vinculativo com o Relibre</li>
                <li>
                  Cumprirá este Contrato e todas as normas, leis e regulamentos
                  municipais, estaduais e nacionais aplicáveis
                </li>
                <li>
                  Você nunca foi condenado por crime ou qualquer crime que
                  envolva violência
                </li>
              </ul>
            </p>
            <h4 style={{ textAlign: 'left' }}>
              3. Rescisão de contrato e Alteração do Serviço
            </h4>
            <p style={{ fontWeight: 400 }}>
              O Relibre poderá cancelar sua conta a qualquer momento, sem aviso
              prévio, se acreditar que você violou este Contrato. Após o
              referido cancelamento, você não terá direito a nenhum reembolso e
              este Contrato será rescindido.
            </p>
            <p style={{ fontWeight: 400 }}>
              O Relibre poderá alterar ou adicionar novos termos relativos ao
              serviço a qualquer momento. Alterações entrarão em vigor quando a
              equipe Relibre fizer a postagem da nova versão neste mesmo local.
              Caso você continue a utilizar o serviço após esta atualização
              representa seu consentimento com os termos alterados ou
              adicionados.
            </p>
            <h4 style={{ textAlign: 'left' }}>4. Segurança</h4>
            <p style={{ fontWeight: 400 }}>
              Embora a equipe Relibre se esforce para incentivar uma experiência
              de membro com respeito, por meio de recursos como a combinação,
              que permite aos membros se comunicarem apenas se ambos tiverem
              interesse no livro um do outro, não somos responsáveis pela
              conduta do membro dentro ou fora do Serviço. Você concorda que
              você é o único responsável por suas interações com outros
              usuários. Você entende que o Relibre não investiga antecedentes
              criminais dos usuários. Desta forma, o Relibre não se
              responsabiliza e não manifesta garantias em relação à conduta dos
              usuários.
            </p>
            <h4 style={{ textAlign: 'left' }}>
              5. Conduta e Obrigações do Usuário
            </h4>
            <p style={{ fontWeight: 400 }}>
              Ao utilizar o Serviço Relibre, você concorda em não:
              <ul>
                <li>
                  Usar o Serviço para qualquer fim desonesto e prejudicial
                </li>
                <li>
                  Intimidar, maltratar, agredir, perseguir, enganar, difamar ou
                  ameaçar qualquer pessoa
                </li>
                <li>
                  Criar outra conta sem a permissão do Relibre, se já tivermos
                  cancelado a sua por qualquer motivo
                </li>
                <li>Cadastrar livros que você não possui</li>
                <li>
                  Cadastrar livros com páginas rasgadas ou em condições
                  precárias e sem condições de uso
                </li>
                <li>
                  Fazer spam ou fraudar qualquer usuário; Utilizar o Serviço
                  para qualquer finalidade que seja proibida ou ilegal por este
                  Contrato
                </li>
                <li>
                  Utilizar o Serviço com o propósito de prejudicar o Relibre
                </li>
                <li>Utilizar dados falsos no cadastro de usuário</li>
                <li>
                  Utilizar a conta de outro usuário, compartilhar uma conta com
                  outro usuário
                </li>
              </ul>
              O Relibre reserva-se o direito de cancelar a sua conta, sem
              qualquer tipo de reembolso, se este contrato for violado ou caso
              seja identificado comportamento inadequado dentro ou fora do
              Serviço.
            </p>
            <h4 style={{ textAlign: 'left' }}> 6. Livros dos usuários</h4>
            <p style={{ fontWeight: 400 }}>
              O Livro publicado pelo usuário em sua biblioteca no Serviço para
              troca, doação ou empréstimo é de exclusiva responsabilidade do
              usuário que publica, e o Relibre não garante que todo o conteúdo
              do Livro está em perfeitas condições. O Relibre não fornece
              garantias de qualquer tipo de reembolso seja por qualquer motivo.
            </p>
            <h4 style={{ textAlign: 'left' }}>
              7. Isenção de responsabilidade
            </h4>
            <p style={{ fontWeight: 400 }}>
              Ao utilizar o Serviço Relibre, você concorda que:
              <ul>
                <li>
                  O Relibre não assume nenhuma responsabilidade por qualquer
                  conteúdo que você, outros usuários ou terceiros publicam,
                  enviam ou recebem. Qualquer material obtido ou enviado através
                  do uso do Serviço, é por sua própria conta e risco
                </li>
                <li>
                  O Relibre não se responsabiliza por nenhum tipo de transações
                  financeiras entre usuários.
                </li>
                <li>
                  O Relibre não se responsabiliza pelo envio e recebimento de
                  livros. É de responsabilidade dos usuários decidirem a melhor
                  maneira de realizar o processo de envio dos livros que estejam
                  disponíveis para troca, doação ou empréstimo.
                </li>
                <li>
                  O Relibre não declara ou garante que o Serviço será
                  ininterrupto, seguro ou livre de erros, quaisquer defeitos no
                  Serviço serão corrigidos.
                </li>
              </ul>
            </p>
            <h4 style={{ textAlign: 'left' }}> 8. Serviços terceirizados</h4>
            <p style={{ fontWeight: 400 }}>
              O Serviço pode conter anúncios de livros oferecidos por terceiros.
              O Relibre não é responsável pela disponibilidade ou pela falta de
              disponibilidade desses recursos externos. Se optar por interagir
              com terceiros disponibilizados através do nosso Serviço, os termos
              desse terceiro controlarão a relação deles com você. O Relibre não
              é responsável pelos termos ou ações de terceiros.
            </p>
            <h4 style={{ textAlign: 'left' }}> 9. Contrato; outros</h4>
            <p style={{ fontWeight: 400 }}>
              Você concorda em isentar e defender o Relibre, e seus respectivos
              responsavéis de e contra quaisquer e todas as reinvidicações,
              danos, despesas, custos, perdas, reclamações, responsabilidades
              resultantes ou relacionados, de qualquer forma, com o seu uso do
              Serviço, seu conteúdo ou a sua violação deste contrato.
            </p>
            <Divider style={{ margin: '3rem 0', width: '85%' }} />
            <h2 style={{ textAlign: 'left' }}>Política de Privacidade</h2>
            <p style={{ fontWeight: 400 }}>
              O Relibre coleta suas informações para prestar e continuamente
              melhorar nosso serviço. Compreendemos que você confia em nós as
              suas informações e é nosso objetivo manter sempre essa confiança e
              por isto a sua privacidade é a prioridade principal. Esta política
              descreve as práticas de privacidade adotadas pelo Relibre.
            </p>
            <p style={{ fontWeight: 400 }}>
              Esta Politica de Privacidade entra em vigor em 5 de setembro de
              2020.
            </p>
            <h4 style={{ textAlign: 'left' }}>
              1. Informações que você nos fornece e como elas serão utilizadas
            </h4>
            <p style={{ fontWeight: 400 }}>
              Para que seja possível encontrar o livro mais próximo de você
              algumas informações pessoais, como dados do perfil básico e
              endereço do usuário. Ao utilizar o nosso Serviço, você escolhe
              fornecer-nos determinadas informações. Isto inclui:
              <ul>
                <li>
                  Ao criar uma conta no Relibre, você nos fornece seus dados de
                  login, como nome completo e número de telefone. Estas
                  informações são coletadas para que possamos identificá-lo
                  dentro do Serviço.
                </li>
                <li>
                  Ao usar o Serviço, o navegador irá solicitar o uso do seu
                  endereço. Esta informação é coletada através do seu navegador
                  para que possamos identificar qual usuário mais próximo do seu
                  local, possui o livro que você deseja.
                </li>
                <li>
                  Ao completar o seu perfil, você pode cadastrar quais livros
                  você deseja. Esta informação é utilizada para identificarmos e
                  filtrarmos os livros cadastrados no Serviço e apresentar
                  somente os livros do seu interesse.
                </li>
              </ul>
              O principal motivo pelo qual usamos as suas informações é o de
              fornecer e melhorar os nossos Serviços. Utilizamos estas
              informações para manter a sua segurança e para lhe fornecer
              anúncios que possam ser do seu interesse.
            </p>
            <h4 style={{ textAlign: 'left' }}>
              2. Como compartilhamos as suas informações
            </h4>
            <p style={{ fontWeight: 400 }}>
              O objetivo do Relibre é conectar pessoas próximas de uma
              determinada região que possuam um interesse em comum em livros.
              Desta forma, o principal compartilhamento de informações dos
              usuários é, evidentemente, com outros usuários. Este
              compartilhamento de informação ocorre somente quando existe uma
              combinação de interesse entre os usuários pessoa física, em casos
              em que se trata de pessoa jurídica, o usuário interessado poderá
              escolher se enviará ou não os seus dados para contato para o
              proprietário pessoa jurídica do livro.
            </p>
            <h4 style={{ textAlign: 'left' }}>
              3. Alterações da Política de Privacidade
            </h4>
            <p style={{ fontWeight: 400 }}>
              Esta política pode mudar ocasionalmente. Estas alterações serão
              implementadas e serão notificadas para todos os usuários
              cadastrados no Serviço.
            </p>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};
export default withStyles(componentsStyle)(HomePage);
