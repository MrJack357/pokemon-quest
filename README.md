# Guia de Execução - Pokemon Quest - Datadex

Este documento contém as instruções para executar o projeto Pokemon Quest, uma aplicação React que consome a PokeAPI e exibe informações sobre pokémons.

## Requisitos

- Node.js (v14.0.0 ou superior) - O projeto foi testado com a versão 24.0.1
- npm ou yarn

## Passo a Passo para Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pokemon-quest.git
cd pokemon-quest
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Execute em modo de desenvolvimento

```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

### 4. Para executar os testes

```bash
npm test
# ou
yarn test
```

## Scripts disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm test` - Executa os testes
- `npm run build` - Compila o projeto para produção
- `npm run eject` - Ejeta as configurações do create-react-app

## Funcionalidades implementadas

- ✅ Listagem de pokémons em cards
- ✅ Paginação com "Carregar mais"
- ✅ Visualização detalhada de cada pokémon
- ✅ Tema claro/escuro
- ✅ Filtro por tipo de pokémon (desafio bônus)
- ✅ Testes unitários (desafio bônus)

## Estrutura da aplicação

### Componentes

Principais componentes da aplicação:

- `PokemonCard` - Exibe um pokémon na listagem
- `PokemonList` - Lista de cards de pokémons
- `TypeFilter` - Filtro por tipo de pokémon
- `ThemeToggler` - Botão para alternar entre temas
- `Loading` - Indicador de carregamento
- `Button` - Componente de botão reutilizável

### Páginas

- `Home` - Página inicial com a listagem de pokémons
- `PokemonDetails` - Página de detalhes de um pokémon específico

### Context API

- `ThemeContext` - Gerencia o tema da aplicação (claro/escuro)

### Serviços

- `api.js` - Funções para comunicação com a PokeAPI

## Decisões técnicas

1. **Styled Components**: Escolhido para facilitar a estilização baseada em temas e componentes
2. **Context API**: Utilizado para gerenciar o estado global do tema
3. **React Router**: Para navegação entre páginas sem recarregar a aplicação
4. **Axios**: Para simplificar as requisições HTTP
5. **Jest**: Para testes unitários dos componentes

## Possíveis melhorias futuras

- Implementar cache das requisições para melhorar a performance
- Adicionar busca por nome de pokémon
- Adicionar sistema de favoritos
- Implementar testes de integração e end-to-end
