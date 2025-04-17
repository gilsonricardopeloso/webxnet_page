# WebXNet - Plataforma de Soluções Digitais

## 📋 Visão Geral

A WebXNet é uma plataforma moderna de soluções digitais que oferece serviços especializados em desenvolvimento web, consultoria em TI e soluções personalizadas para empresas. O projeto visa proporcionar uma experiência digital completa e eficiente para nossos clientes.

## ✨ Recursos Principais

### 🎯 Diagnóstico Digital

- Análise detalhada do estado atual da presença digital
- Identificação de pontos de melhoria
- Recomendações personalizadas
- Relatórios detalhados com insights acionáveis

### 📱 Landing Page Moderna

- Design responsivo e intuitivo
- Seções informativas sobre serviços
- Formulário de contato integrado
- Integração com Mailchimp para gestão de leads

### 📧 Sistema de Contato Avançado

- Formulário de contato com validação
- Campos detalhados para informações de contato
- Integração com API para gestão de leads
- Suporte a endereços completos (Rua, Complemento, Cidade, Estado, CEP, País)
- Validação de campos obrigatórios
- Feedback visual de erros
- Confirmação de envio

## 🛠️ Pilha de Tecnologia

### Frontend

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset tipado de JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool e servidor de desenvolvimento
- **Radix UI** - Componentes de UI acessíveis
- **React Router** - Roteamento de aplicação

### Backend

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **Axios** - Cliente HTTP para requisições
- **Mailchimp API** - Integração com serviço de email marketing

### Ferramentas de Desenvolvimento

- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **Git** - Controle de versão
- **Service Worker** - Cache e funcionalidades offline

## 🚀 Configuração do Ambiente

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Git

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/gilsonricardopeloso/webxnet_page.git
cd webxnet_page
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

## 📦 Estrutura do Projeto

```
webxnet/
├── src/
│   ├── components/     # Componentes React
│   ├── lib/           # Utilitários e configurações
│   ├── hooks/         # Hooks personalizados
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Ponto de entrada
├── public/            # Arquivos estáticos
├── index.html         # Template HTML
└── package.json       # Dependências e scripts
```

## 📈 Marcos do Projeto

### Versão 1.0.0 (Inicial)

- [x] Estrutura básica do projeto
- [x] Configuração do ambiente de desenvolvimento
- [x] Implementação do tema claro/escuro
- [x] Componentes de UI básicos

### Versão 1.1.0

- [x] Formulário de contato funcional
- [x] Integração com Mailchimp
- [x] Validação de campos
- [x] Feedback visual de erros

### Versão 1.2.0

- [x] Seção de diagnóstico digital
- [x] Melhorias na responsividade
- [x] Otimização de performance
- [x] Cache com Service Worker

### Próximos Passos

- [ ] Dashboard administrativo
- [ ] Sistema de autenticação
- [ ] Análise de métricas
- [ ] Integração com CRM

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de enviar pull requests.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

Para mais informações, entre em contato através do formulário em nosso site ou envie um email para contato@webxnet.com.br

# Webxnet Landing Page

Landing page moderna com React, Vite, TailwindCSS e backend serverless para integração com Mailchimp, pronta para deploy na Netlify.

---

## ✨ Funcionalidades

- **Frontend**: React + Vite + TailwindCSS
- **Formulário de contato**: Envia dados para o Mailchimp via função serverless
- **Backend**: Função serverless Netlify (`netlify/functions/contact.ts`) ou Express local
- **Deploy fácil**: Pronto para Netlify, com domínio customizado e variáveis de ambiente

---

## 🚀 Como rodar localmente

### 1. Instale as dependências

```sh
npm install
```

### 2. Rode o frontend

```sh
npm run dev
```

### 3. (Opcional) Rode as funções serverless localmente

Instale o Netlify CLI:

```sh
npm install -g netlify-cli
```

Rode o projeto com funções serverless:

```sh
netlify dev
```

Acesse: [http://localhost:8888](http://localhost:8888)

### 4. (Opcional) Rode o backend Express localmente

Se preferir rodar o backend tradicional:

```sh
cd backend
npm install
npm run dev
```

O frontend já está configurado para enviar para `/api/contact`.

---

## 🛠️ Estrutura do Projeto

- `src/` — Código do frontend (React)
- `src/lib/api.ts` — Integração do frontend com o backend/função serverless
- `netlify/functions/contact.ts` — Função serverless para envio ao Mailchimp
- `backend/server.ts` — Backend Express para uso local (opcional)
- `netlify.toml` — Configuração de build e redirects para Netlify

---

## 🌐 Deploy na Netlify

### 1. Suba o projeto para um repositório Git (GitHub, GitLab, Bitbucket)

### 2. Importe o projeto na Netlify

- Clique em "Add new site" > "Import an existing project"
- Escolha o repositório

### 3. Configure o build

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions`

### 4. Variáveis de ambiente

No painel da Netlify, adicione em **Site settings > Environment variables**:

- `MAILCHIMP_API_KEY`
- `MAILCHIMP_SERVER_PREFIX`
- `MAILCHIMP_LIST_ID`
- `NPM_FLAGS = --legacy-peer-deps`

### 5. Deploy

- Clique em "Deploy site"
- O site estará disponível em `https://<seu-site>.netlify.app` e no domínio customizado (após configuração DNS)

---

## 📝 Configuração de Redirects (`netlify.toml`)

```toml
[build]
  functions = "netlify/functions"

[build.environment]
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/api/contact"
  to = "/.netlify/functions/contact"
  status = 200
  force = true
```

---

## 📨 Função Serverless de Contato (`netlify/functions/contact.ts`)

- Recebe POST em `/api/contact`
- Faz integração com Mailchimp
- Lida com CORS automaticamente

---

## 🐞 Dicas de Troubleshooting

- Se o build falhar por dependências, use a variável de ambiente `NPM_FLAGS = --legacy-peer-deps`
- Se o domínio customizado mostrar o site antigo, confira a configuração DNS e faça um novo deploy
- Veja os logs das funções serverless no painel da Netlify para debugar problemas de envio
- Rode `npm run build` localmente para garantir que não há erros antes do deploy

---

## 📦 Scripts úteis

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "netlify:dev": "netlify dev"
}
```

---

## 📄 Licença

MIT
