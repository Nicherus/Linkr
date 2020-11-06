# Requisitos

- Geral
  - [x] Manipule o HTML usando somente React (sem usar o document nem bibliotecas como jQuery)
  - [x] Seu projeto deverá ser desenvolvido utilizando Git e GitHub
  - [x] Para isso, crie um repositório público no seu GitHub e compartilhe acesso com sua dupla
  - [x] **A cada requisito implementado** faça um commit com uma mensagem descritiva do que você evoluiu. Caso queira dividir um requisito em vários commits, não há problema. Mas evite colocar mais de um requisito no mesmo commit
- Layout
  - [x] Aplicar layout para desktop, seguindo imagens fornecidas
  - [x] Aplicar layout para mobile, seguindo imagens fornecidas
  - [x] Fontes e cores devem ser extraídas do Figma: [https://www.figma.com/file/PzDjhf1EyeZ0opdDnhLmwJ/linkr?node-id=0%3A1](https://www.figma.com/file/PzDjhf1EyeZ0opdDnhLmwJ/linkr?node-id=0%3A1) (crie uma conta no Figma e se logue para ter acesso ao Inspect)
  - [x] Tamanhos/posicionamento podem ser aproximados, não é necessário copiar o Figma (não recomendado!)
  - [x] Para ícones, utilize a biblioteca **react-icons**
- Tela de Login (rota "/")

  - Login
    - [x] Ao clicar em entrar, caso algum dos campos esteja vazio, deverá aparecer um alert solicitando o preenchimento dos campos
    - [x] Ao clicar em entrar, caso os campos estejam preenchidos, deverá ser enviado um request `post` para o servidor, seguindo documentação
    - [x] Caso o servidor retorne uma falha (status 401), deverá ser lançado um alert para o usuário de email/senha incorretos
    - [x] Caso o servidor retorne sucesso (status 200), o usuário deve ser redirecionado para a rota "/timeline"
    - [x] Em caso de sucesso, o servidor retornará na resposta também um código identificador do usuário que você deve **guardar** para usar nos próximos requests pro servidor, assim como dados sobre usuário (como nome e foto)
    - [x] Ao clicar em entrar, o botão deve ser desabilitado até o servidor responder, evitando que o usuário clique no botão várias vezes
    - [x] Ao clicar em "First time? Create an account!", os campos devem mudar pro formato da tela 2
  - Cadastro
    - [x] Ao clicar em cadastrar, caso algum dos campos esteja vazio, deverá aparecer um alert solicitando o preenchimento dos campos
    - [x] Ao clicar em entrar, caso os campos estejam preenchidos, deverá ser enviado um request `post` para o servidor, seguindo documentação
    - [x] Caso o servidor retorne uma falha (status 400), deverá ser lançado um alert para o usuário informando que o email inserido já está cadastrado
    - [x] Caso o servidor retorne sucesso (status 201), o usuário deve ser redirecionado para a rota "/timeline"
    - [x] Em caso de sucesso, o servidor retornará na resposta também um código identificador do usuário que você deve **guardar** para usar nos próximos requests pro servidor, assim como dados sobre usuário (como nome e foto)
    - [x] Ao clicar em cadastrar, o botão deve ser desabilitado até o servidor responder, evitando que o usuário clique no botão várias vezes
    - [x] Ao clicar em "Switch back to Log In", os campos devem mudar pro formato da tela 1
  - Autenticação

    - [x] A partir da próxima tela, todos os requests para o servidor devem incluir um **header** de nome `User-Token`, contendo o valor retornado pelo servidor no request de autenticação (que você guardou nos requisitos anteriores)

      Dica: pesquise por "add header axios"

- Tela de Timeline (rota "/timeline")
  - Topo
    - [x] Implementar topo como especificado no layout. O topo deve ser fixo.
    - [x] Ao clicar na seta/foto do usuário, deve abrir um menu conforme layout e seta deve virar para cima
    - [x] Ao clicar novamente, deve-se fechar o menu e virar a seta novamente pra baixo
    - [x] Ao clicar em "My posts", o usuário deve ser redirecionado para a rota "/my-posts"
    - [x] Ao clicar em "Logout", o usuário deve ser redirecionado novamente para a rota de login ("/") e os dados de usuário logado devem ser resetados no front
  - Publicação
    - [x] Ao clicar em "Publish", deve ser validado se o usuário preencheu o link (o texto é opcional)
    - [x] Ao clicar em "Publish", deve ser enviado um post para o servidor com os dados inseridos
    - [x] Ao clicar em "Publish", o botão deve ser desabilitado para evitar novos cliques e os campos devem ficar desabilitados para edição. O texto do botão deve mudar para "Publishing..."
    - [x] Em caso de erro no envio, deve ser exibida uma mensagem de "Houve um erro ao publicar seu link" e os campos e botões devem voltar a ser habilitados
    - [x] Em caso de sucesso no envio, os campos e botões devem ser re-habilitados, os campos devem ser limpos e a lista de posts da timeline deve ser atualizada para conter a nova publicação
  - Lista de Posts
    - [x] Ao entrar na tela, deve-se carregar a lista de posts do servidor e exibida conforme layout
    - [x] Enquanto a lista é carregada, deve-se exibir uma mensagem de "Loading" na área em que aparecem os posts. Pesquise por gifs animados de loading para ilustrar.
    - [x] Caso o servidor retorne algum erro, deve ser exibida uma mensagem de "Houve uma falha ao obter os posts, por favor atualize a página"
    - [x] Caso o servidor retorne uma lista vazia de posts, deve ser exibida uma mensagem de "Nenhum post encontrado"
  - Trending
    - [x] Ao entrar na tela, deve-se carregar a lista de hashtags populares do servidor e exibida conforme layout
    - [x] Ao clicar em uma hashtag, o usuário deve ser redirecionado para a rota "/hashtag/:hashtag" em que :hashtag é o nome da hashtag (sem #)
- Post

  - [x] Ao clicar na foto ou nome do usuário que publicou um post, o usuário deve ser redirecionado para a página "/user/:id" em que :id é o id do usuário
  - [x] Ao clicar em uma hashtag ao longo do texto do post, o usuário deve ser redirecionado para a página da hashtag clicada. Observe que as hashtags ficam marcadas em negrito e cor branca no layout.

    **Dica**: Pesquise por uma biblioteca chamada **react-hashtag**

  - [x] Ao clicar no snippet do link compartilhado, o link deve abrir em uma nova aba

- Telas de post filtrados (rotas "/my-posts", "/hashtag/:hashtag", "/user/:id")

  - [x] Devem ser exatamente com a página timeline, mudando somente:
    - [x] A caixa de publicação não deve aparecer
    - [x] O título deve mudar de "timeline" para "**my posts**" / "**#hashtag**" / "**Juvenal's posts**" conforme layout
    - [x] Os posts carregados devem ser obtidos das rotas da API correspondentes

- Deploy
  - [x] Coloque seu projeto no ar usando o GitHub Pages

# Bônus (opcional)

- Funcionalidade de "Like"

  - [x] Adicione um botão de like nos posts, conforme layout
  - [x] Caso o usuário logado tenha dado like no post, o coração deve ser preenchido
  - [x] Ao passar o mouse sobre o número de likes, deve aparecer uma tooltip com a frase "Fulano, Beltrano e outras x pessoas" caso o usuário logado não tenha curtido ou "Você, Fulano e outras x pessoas" caso tenha curtido

    Dica: Pesquise por uma biblioteca chamada **react-tooltip**

  - [x] Adicione mais um link no menu chamada "My likes" que redireciona o usuário para a rota "/my-likes"
  - [esperando api] Implemente a página "/my-likes" como mais uma página de posts filtrados

- Campo para digitar hashtag
  - [x] Na caixa de "trending" adicione um input que permita o usuário digitar uma hashtag e, ao dar enter, redirecionar o usuário para a página "/hashtag/:hashtag" onde hashtag é o texto digitado
- Carregamento dinâmico

  - [x] Em todas as telas que tem carregamento de posts, passe a buscar da API somente 10 posts de cada vez, carregando mais posts conforme o usuário scrolla até o final da tela

    Dica: pesquise por uma biblioteca chamada **react-infinite-scroller**

- Animação para transitar entre as páginas

  - [x] Adicione uma animação de transição ao trocar de páginas (por exemplo, uma página sumir ao mesmo tempo que a próxima aparece)

    Dica: pesquise por uma biblioteca chamada **react-transition-group** e como utilizá-la em conjunto com o react-router

## SEMANA 2

- Apagar post

  - [x] Adicionar um botão de "lixeira" (remover) nos posts em que o usuário logado seja o autor, seguindo layout
  - [x] Ao clicar, deve-se abrir uma modal (também chamada de dialog), confirmando que o usuário gostaria de deletar o post, seguindo layout.

    **Dica**: pesquisa pela biblioteca **react-modal**

  - [x] Caso afirmativo, deve-se enviar um request para o servidor pedindo o delete, exibindo uma mensagem de loading e desabilitando os botões do modal enquanto o servidor não responde

    **Dica**: pesquise pela função **axios.delete**

  - [x] Ao retornar, em caso de sucesso a modal deve ser fechada e a lista de posts recarregada
  - [x] Em caso de erro, deve-se fechar a modal e exibir um alerta pro usuário de que não foi possível excluir o post

- Editar post

  - [x] Adicionar um botão de "lápis" (editar) nos posts em que o usuário logado seja o autor, seguindo layout
  - [x] Ao clicar, o texto do post deve se tornar um campo editável seguindo layout e o cursor deve ser colocado automaticamente no campo

    **Dica**: pesquise por "**focus useRef**" e descubra como fazer esse foco com React

  - [x] Ao clicar novamente no botão, ou pressionar Esc dentro do campo, as alterações devem ser descartadas e o texto do post deve voltar a ser um parágrafo normal em vez de campo
  - [x] Ao dar enter dentro desse campo, deve-se enviar um update pro servidor e campo deve ficar disabled enquanto a requisição não volta

    **Dica**: pesquise por **axios.put**

  - [x] Em caso de sucesso, o campo deve voltar a ser um parágrafo normal, com o texto atualizado
  - [x] Em caso de erro, o usuário deve ser alertado que não foi possível salvar as alterações e o campo deve voltar a ficar enabled pra edição, ainda contendo o último texto digitado pelo usuário

- Follow / Unfollow

  - [x] Ao entrar na página de perfil de uma pessoa (que não seja o próprio usuário logado), deve existir agora um botão "Follow" / "Unfollow"
  - [x] Ao clicar nesse botão, deve-se enviar uma requisição pro servidor, para seguir/desseguir a pessoa
  - [x] Enquanto a requisição não volta, o botão deve ficar desabilitado
  - [x] Em caso de sucesso, o botão deve alternar de Follow para Unfollow e vice-versa
  - [x] Em caso de falha, deve-se exibir um alerta pro usuário indicando que não foi possível executar a operação
  - [x] Para saber inicialmente se o usuário já segue ou não uma pessoa, você pode pegar a lista de usuários seguidos através da API. O botão de Follow/Unfollow deve iniciar no estado correspondente.

- Busca de perfis

  - [x] Agora no topo do site deve ser exibida uma caixa de busca, seguindo layout
  - [x] A cada letra digitada na busca, deve ser disparada uma busca no servidor e os resultados devem ser exibidos conforme layout
  - [x] A busca só deve ser disparada quando o usuário digitou pelo menos 3 caracteres e esperando o usuário ficar sem digitar por pelo menos 300ms.

    **Dica**: essa técnica se chama debounce, tem uma lib que pode te ajudar: **react-debounce-input**

  - [ ] Ao exibir os resultados, deve-se mostrar no topo os usuários que você já segue, com a indicação de "following" seguindo layout. Esse tratamento deve ser feito no front, o servidor não responderá de forma ordenada
  - [x] Ao clicar em um resultado, deve-se redirecionar o usuário para a página de perfil daquele usuário

- Nova timeline

  - [x] Na página de timeline (rota "/timeline"), agora devem aparecer somente os posts das pessoas que você segue e não mais todo mundo. Utilize a nova rota na API para esse fim.
  - [x] Caso o usuário não siga ninguém ainda, deve aparecer no lugar dos posts uma mensagem dizendo "Você não segue ninguém ainda, procure por perfis na busca"
  - [x] Caso o usuário já siga pessoas, mas elas não tenham postado nada, deve aparecer no lugar dos posts uma mensagem dizendo "Nenhuma publicação encontrada"
  - [x] Agora, na página de timeline, os posts devem ser recarregados do servidor a cada 15 segundos e atualizados em tela

    **Dica**: Pesquise sobre como utilizar setInterval em um componente React. Pesquise sobre como funciona o retorno da função passada pra useEffect e como você pode utilizá-la junto do clearInterval do JS

# Bônus (opcional)

- Persistência de login

  - [x] Faça com que o usuário permaneça logado mesmo ao atualizar a página. Para isso, ao logar, armazene o token de autenticação no navegador e verifique se o mesmo existe ao entrar na aplicação, redirecionando o usuário para a timeline imediatamente caso já esteja logado

    **Dica**: pesquise por **Local Storage** e utilize esse recurso para armazenar dados no navegador

  - [x] Ao clicar em "Logout", além de redirecionar para a tela de login, apague o token persistido do Local Storage

- Link do YouTube

  - [x] Ao exibir um post, caso o link compartilhado seja um link do YouTube, substitua o snippet padrão pelo player embedded do YouTube

    **Dica**: pesquise por uma lib chamada **get-youtube-id** e pesquise sobre como adicionar o player do YouTube no seu projeto

- Desafio: Localização

  - [x] Adicione um botão de "Localização ativada" / "Localização desativada" na caixa de publicação de posts, conforme layout
  - [x] Por padrão, a localização deve vir desativada
  - [x] Ao clicar para ativá-la, deve-se pedir permissão ao navegador para obter essa informação de geolocalização

    **Dica**: pesquise como obter a geolocalização por JS

  - [x] Caso não seja possível obter a localização, exiba um alerta para o usuário e volte o botão para o estado de desativado
  - [x] Caso consiga pegar a localização, envie essa nova informação de latitude e longitude para o servidor ao publicar um post, seguindo documentação da API
  - [x] Ao exibir posts na timeline, deve-se exibir um ícone de "pinpoint" ao lado do nome do autor do post, conforme layout
  - [x] Ao clicar nesse ícone, deve-se abrir uma modal conforme layout, exibindo um mapa com a posição informada

    **Dica**: pesquise sobre como integrar um mapa do Google Maps no seu projeto React

# Layout

Crie uma conta no Figma e acesse o link: [https://www.figma.com/file/PzDjhf1EyeZ0opdDnhLmwJ/linkr?node-id=0%3A1](https://www.figma.com/file/PzDjhf1EyeZ0opdDnhLmwJ/linkr?node-id=0%3A1)
