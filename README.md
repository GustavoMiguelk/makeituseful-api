# 🌱 MAKE IT USEFUL ♻️ #
**Make It Useful** é uma reescrita de um projeto originalmente desenvolvido em PHP, agora reconstruído com uma stack moderna para proporcionar mais escalabilidade, usabilidade e eficiência.

## 🧾 O que é o Make It Useful? ##
- 💡 Trabalho de Conclusão de Curso (TCC) desenvolvido na **ETEC de Santa Isabel.**
- ♻️ Plataforma que **conecta empresas de reciclagem com coletores autônomos**, promovendo a melhoria do sistema de gestão de resíduos sólidos da cidade de Santa Isabel – SP.
- 🌍 Tem como objetivo **incentivar práticas sustentáveis** e facilitar a comunicação entre os envolvidos no ciclo da reciclagem.

## 🚀 Instalação e Execução ##
### Pré-requisitos ###
Antes de começar, você deve ter instalado em sua máquina
- [Node.js](https://nodejs.org/pt)
- [Docker](https://www.docker.com/)
- [DockerCompose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### 🧱  Clonando o Repositório ###
```bash
git clone https://github.com/GustavoMiguelk/makeituseful-api
cd makeituseful
```

### 📦 Instalando Dependências ###
```bash
npm install
```
### 🐋 Subindo o banco de dados com Docker ###
Certifique-se de que o Docker esteja em execução e execute o comando abaixo:
```bash
docker-compose up -d
```

### 🔄 Executando as migrates do Prisma ###
```bash
npx prisma migrate dev
```

### ▶️ Rodando o Servidor ###
O servidor roda na porta 3333:
```bash
npm run dev
```

## 🪧 Rotas da API ##
Para utilizar a API de maneira simples:
- Instalando o [Insomnia](https://insomnia.rest/download)
- Em seguida faça a importação do arquivo insomnia.yaml

## Roteiro de Utilização ##
### 👤 Usuário ###
- Crie sua conta utilizando as rotas de usuário.
- Efetue o Login
- Cadastre um item para coleta por meio das rotas de produto.

### 🏢 Empresa ###
- Crie sua conta utilizando as rotas de empresa.
- Efetue o Login
- Visualize os produtos disponíveis para coleta e selecione os desejados.
- Atualize o status das solicitações de coleta conforme o andamento do processo.





