# Interface para gerenciamento de usuários
Sistema para gerenciamento de usuários e operações básicas CRUD.
> Para executar a aplicação back-end acesse [Users API](https://github.com/ademirsantosjr/users_api) e siga as instruções.

## Ferramentas utilizadas
- Angular CLI 17.2.3
- Angular Material 17.3.0

## Executar a aplicação
Antes de começar, assegure a versão 17 do Angular instalada:
```bash
ng version
```
Configure as variáveis de ambiente na pasta `environments`. No arquivo `environment.development`, altere o valor da propriedade `apiUrl` para o endereço em que a aplicação back-end está sendo executada (ex. `http://localhost:8080`).<br>
<br>
Para executar a aplicação back-end acesse [Users API](https://github.com/ademirsantosjr/users_api) e siga as instruções.
### Passo a Passo
1. Acessar a raiz do projeto (onde se encontra pasta `/src`)
2. Executar o comando a seguir:
```bash
ng serve
```
3. Navegar até o endereço `http://localhost:4200/` no navegador

## Usuários e Senhas
A aplicação back-end cria vários usuários automaticamente. Para efeito de teste, a senha de todos os usuários é idêntica ao seu próprio nome.<br>
<br>
Faça o primeiro acesso com o usuário `Debbie` e senha `Debbie`. Este usuário é um dos Administradores do sistema.

