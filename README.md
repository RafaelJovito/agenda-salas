# Sistema de Reservas de Salas de Reunião

## Descrição

Este é um sistema de reservas de salas de reunião onde os usuários podem visualizar a disponibilidade das salas, realizar reservas, e editar ou cancelar suas próprias reservas. O sistema é uma aplicação full stack com backend em **PHP** e **Laravel**, banco de dados **PostgreSQL** e frontend em **ReactJS**, **HTML5** e **CSS**. A aplicação também expõe e consome uma **API REST**.

## Funcionalidades

- Visualizar salas de reunião disponíveis.
- Reservar uma sala, especificando data e horário de início e término.
- Editar ou cancelar reservas existentes.
- Garantir que uma sala não seja reservada para o mesmo horário.
- Não permitir reservas para datas passadas.

## Tecnologias Utilizadas

- **Backend**: PHP 8.x, Laravel 10.x, PostgreSQL.
- **Frontend**: ReactJS, HTML5, CSS.
- **Banco de Dados**: PostgreSQL.
- **API**: RESTful API para comunicação entre frontend e backend.

## Instalação

### Pré-requisitos

- PHP >= 8.0
- Composer >= 2.0
- Node.js >= 16.x
- PostgreSQL >= 13.x
- Git
- Um servidor local (ex: Apache, Nginx)

### Clonando o Repositório

```shell
git clone https://github.com/RafaelJovito/agenda-salas.git
cd agenda-salas
```

### Backend (Laravel)

* 1- Instale as dependências do Laravel:

```shell
cd agenda-salas
composer install
```

* 2- Crie o arquivo .env e configure suas variáveis de ambiente::

```shell
cp .env.example .envl
```

* Abra o arquivo .env e configure a conexão com o banco de dados, por exemplo::

```shell
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nome_do_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

* 3- Gere a chave da aplicação::

```shell
php artisan key:generate
```

* 4- Crie o banco de dados no PostgreSQL:

```shell
CREATE DATABASE agenda-salas;
```
* 5- Execute as migrações do banco de dados para criar as tabelas necessárias:

```shell
php artisan migrate
```

* 6- Inicie o servidor embutido do Laravel:

```shell
php artisan serve
```

* O backend estará disponível em

```shell
http://localhost:8000
```
### Frontend (React)

* 1- Navegue até a pasta do frontend
```shell
cd frontend
```
* 2- Instale as dependências do React:
```shell
npm install
```
* 3- Inicie a aplicação React:
```shell
npm start
```

* O frontend estará disponível em
 ```shell
http://localhost:3000
```

### Uso
- Acesse o sistema no navegador através do endereço:
 ```shell
http://localhost:3000
```
- Visualize a lista de salas disponíveis.
- Para realizar uma reserva, clique em "Reservar", preencha os campos necessários e - clique em "Salvar".
- Para editar ou cancelar uma reserva, acesse a reserva desejada e utilize as opções disponíveis.