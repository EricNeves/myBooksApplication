<h1 align="center">
  <br />
  <img src="./github/icon.png">
  <br />
  My Books Application
  <br />
</h1>

<h4 align="center">
  Aplicação Full Stack desenvolvida com PHP, PostgreSQL, ReactJS e Docker.
</h4> 

<p align="center">
  <img src="https://img.shields.io/github/last-commit/EricNeves/myBooksApplication?style=flat-square&logo=github" alt="Github">
  <a href="https://gitter.im/amitmerchant1990/electron-markdownify"><img src="https://badges.gitter.im/amitmerchant1990/electron-markdownify.svg"></a>
  <a href="https://saythanks.io/to/bullredeyes@gmail.com">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
  <a href="https://www.paypal.me/AmitMerchant">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

![screenshot](github/mybookapp.gif)

### Description
Aplicação <b>Full Stack</b> que consiste em <b>ler</b>, <b>criar</b>, <b>editar</b> e <b>deletar</b> livros pessoais, assim também como <b>modificar</b> dados do usuário.

A <b>API</b> foi desenvolvida com <b>PHP</b>, fazendo somente a utilização de uma biblioteca externa para variáveis de ambiente. Quanto ao restante, utiliza-se recursos do próprio PHP, como a <b>libary GD</b> para redimensionar as images, <b>Rotas</b>, <b>URL amigável</b>, <b>JWT</b>, <b>Injenção de Dependência</b>, <b>PostgreSQL</b> com <b>PDO</b> e muito mais.

No frontend foi utilizado o <b>ReactJS</b> para componentizar a aplicação, trazendo também diversos recursos interessantes, como UI com <b>Chakra UI</b>, <b>React Router</b>, <b>Vite</b> e entre outros.

Para organizar o projeto, fora usado o <b>Docker</b>, que traz muitos recursos valiosos para a execução de toda a aplicação.

### Features

* <b>API</b>
  - PHP - v8.1
   - Composer | psr-4
   - Routes
   - Dependency Injection
   - Env (vlucas/phpdotenv) - v5.5
   - JWT Auth
   - GD - Resize Image
   - PDO | PDO Psql 
   - Cors
* <b>Database</b>
  - PostgreSQL
* <b>Web</b>:
    - ReactJS - Latest
      - Vite
      - pnpm
      - UI - Chakra UI | react / icons
      - Axios
      - React Router
      - Local Storage
* <b>Devops</b>:
  - Docker

### How to use

Para executar a aplicação serão necessários alguns passos importantes.


```sh

# Clone Repository
$ git clone https://github.com/EricNeves/myBooksApplication.git

# MyBooksAplication Folder
$ cd myBooksApplication/

# Install Dependencies - ReactJS
$ cd web && pnpm install

# Install Dependencies - PHP
$ cd www && composer update

# Execute Docker Commands
$ docker-compose -f www/docker-compose.yml up -d --build && docker-compose -f web/docker-compose.yml up -d --build

```

### Application Process

* <b>API</b>
  - localhost:8181
* <b>Adminer</b>
  - localhost:8282
* <b>Web</b>
  - localhost:3131

O proximo passo será copiar as informações que estão dentro do arquivo <b>database.sql</b>, que se encontra na raiz do projeto e posteriormente acessar o Adminer (<b>localhost:8282</b>). 

Obs: password: <b>root</b>

![Adminer](github/adminer.png)

