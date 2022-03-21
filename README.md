# api-chatbot-marketplace
Descrição: uma loja virtual com um bot para Whats App e Telegram.


### Lista de tarefas e atualizações
- [x] Instalar dependências
  - [x] Express
  - [x] Mongoose
  - [x] Bcrypt
  - [x] JsonWebToken
  - [x] Cors
  - [x] Node-telegram-bot-api
  - [x] Whatsapp-web.js
  - [x] Socket.io
  - [x] IoRedis
  - [x] Dotenv --dev
  - [x] Morgan --dev
  - [x] Nodemon --dev
  - [x] Concurrently - dev
- [x] Inicializar servidor com Express
- [x] Inicializar servidor com Web Socket
- [x] Configurar eventos
- [x] Conectar com Mongodb Cloud
- [ ] Conectar com Telegram bot
  - [ ] Gerar Key com Botfather
  - [ ] Estruturar eventos
- [x] Conectar com Whatsapp
  - [x] Gerar sessão
  - [x] Salvar sessão
  - [x] Estruturar eventos
- [x] Front-end Vite
- [x] Gerar Sessão via evento front-end
- [x] Conectar Redis
- [x] Fazer ORM Redis
- [x] Inicializar chatbot

# 

A conexão com o Telegram foi descontinuada, devido ao possivel bloqueio da rede social. Caso haja perspectiva de normalização, a integração será feita.

# Lista de eventos

A conexão com o front-end é baseada na biblioteca Socket.io. Com isso, decidi colocar a lista dos eventos que podem ser transmitidos.

Tags:

  ***IN*** - Client to Server

  ***OUT*** - Server to Client

Eventos: 

