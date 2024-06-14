
# React + TypeScript + Vite

# PadelMaster
Programa de Cálculo de Jogos de Padel

## Projeto de Formulários

Este projeto é uma aplicação web para criação e gerenciamento de formulários, desenvolvido com React, TypeScript e Vite.

### Compilação da criação do projeto

1. **Criar um novo projeto Vite com o React:** Execute o seguinte comando no terminal:
    ```bash
    npm create vite@latest nomedoprojeto 
    ```

2. **Instalar o react-router-dom:** Acesse o diretório do seu projeto recém-criado:
    ```bash
    cd nomedoprojeto
    ```
    E então instale o react-router-dom usando npm:
    ```bash
    npm install react-router-dom
    ```

3. **Criar um repositório no GitHub:** Vá para o GitHub e crie um novo repositório. Você pode fazer isso manualmente através da interface web do GitHub.

4. **Conectar o repositório remoto ao seu projeto local:** Dentro do diretório do seu projeto, execute os seguintes comandos no terminal:
    ```bash
    git init
    ```
    ```bash
    git branch -m main
    ```
    ```bash
    git remote add origin https://github.com/MarcioMiguel22/PadelMaster
    ```
    ```bash
    git add .
    ```
    ```bash
    git commit -m "Adicionando arquivos iniciais do projeto"
    ```
    ```bash
    git push -u origin main
    ```
## Inicializar o repositório Git
 ```bash
git init
```
## Criar e mudar para a branch principal 'main'
```bash
git checkout -b main
```
## Criar e mudar para a branch de desenvolvimento 'develop'
```bash
git checkout -b develop
```
JogadorItem: Componente para um item de jogador individual.
JogadoresLista: Componente para a lista de jogadores.
Campo: Componente para um campo de jogo individual.
Jogo: Componente para representar um jogo completo.
Ranking: Componente para o ranking dos jogadores.
