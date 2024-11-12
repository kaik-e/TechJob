<!-- omit in toc -->
# Contribuindo para o TechJob

Primeiramente, obrigado por dedicar seu tempo para contribuir! ❤️

Todos os tipos de contribuição são encorajados e valorizados. Consulte a [Tabela de Conteúdos](#table-of-contents) para diferentes maneiras de ajudar e detalhes sobre como este projeto lida com elas. Certifique-se de ler a seção relevante antes de fazer sua contribuição. Isso tornará a experiência mais fácil para nós, mantenedores, e mais suave para todos os envolvidos. A comunidade está ansiosa para as suas contribuições. 🎉

> E se você gosta do projeto, mas não tem tempo para contribuir, tudo bem. Há outras maneiras fáceis de apoiar o projeto e mostrar sua apreciação, o que também ficaremos muito felizes:
> - Dê uma estrela no projeto
> - Faça um tweet sobre isso
> - Referencie este projeto no README do seu projeto
> - Mencione o projeto em meetups locais e conte aos seus amigos/colegas

## Criando sua conta no Github

O primeiro passo é criar uma conta no GitHub seguindo as instruções abaixo:

<ul>
  <li>
    <a  href="https://docs.github.com/pt/get-started/start-your-journey/creating-an-account-on-github"
      >Guia de Criação de Conta no Github</a>
  </li>
</ul>

## Clone do Repositório

Abra o terminal do Git Bash

- Clone o repositório para o diretório navegado, utilizando o comando:

<html lang="pt">

      git clone https://github.com/kaik-e/TechJob.git

</html>

## Após acessar no código

- Instalando Python:

<html lang="pt">

      pip install python

</html>

- Atualizar o Python:

<html lang="pt">

      pip install --upgrade pip

</html>

- Atualizar o Python:

<html lang="pt">

      cd .\TechJob\

</html>

- Criando um ambiente virtual:

<html lang="pt">

      python -m venv venv

</html>

- Ativando o ambiente virtual:


<html lang="pt">

      venv\Scripts\activate.bat

</html>

- Instalar o conteúdo do requirements.txt:


<html lang="pt">

      pip install -r requirements.txt

</html>

- Criação de arquivos de migração baseados nas mudanças já existentes:


<html lang="pt">

      python manage.py makemigrations

</html>

- Aplicação das migrações ao seu banco de dados:


<html lang="pt">

      python manage.py migrate

</html>

Por fim, quando necessário, realize os comandos a seguir:

- Para executar o site na URL http://127.0.0.1:8000/, use o comando:


<html lang="pt">

      python manage.py runserver

</html>

- Verificando o status do repositório:


<html lang="pt">

      git status

</html>

- Adicionando arquivos modificados:


<html lang="pt">

      git add .

</html>

- Fazendo o commit das mudanças:


<html lang="pt">

      git commit -m “seu comentário”

</html>

- Enviando as mudanças para o repositório remoto:


<html lang="pt">

      git push

</html>

- Recebendo atualizações do código:


<html lang="pt">

      git pull

</html>
<!-- omit in toc -->
## Tabela de Conteúdos

- [Código de Conduta](#code-of-conduct)
- [Eu Tenho Uma Pergunta](#i-have-a-question)
- [Eu Quero Contribuir](#i-want-to-contribute)
- [Reportando Bugs](#reporting-bugs)
- [Sugerindo Melhorias](#suggesting-enhancements)
- [Sua Primeira Contribuição de Código](#your-first-code-contribution)
- [Melhorando a Documentação](#improving-the-documentation)
- [Guias de Estilo](#styleguides)
- [Mensagens de Commit](#commit-messages)
- [Junte-se à Equipe do Projeto](#join-the-project-team)


## Código de Conduta

Este projeto e todos que participam dele são regidos pelo
[Código de Conduta do TechJob](https://github.com/kaik-e/TechJob/blob/master/CODE_OF_CONDUCT.md).
Ao participar, você espera manter este código. Por favor, relate comportamentos inaceitáveis
para .

## Eu Tenho Uma Pergunta

> Se você deseja fazer uma pergunta, presumimos que você tenha lido a documentação disponível [Documentação](https://github.com/kaik-e/TechJob/blob/main/README.md).

Antes de fazer uma pergunta, é melhor procurar por [Problemas](https://github.com/kaik-e/TechJob/issues) que possam ajudar. Caso você tenha encontrado um problema adequado e ainda precise de mais esclarecimentos, você pode escrever sua pergunta nesse problema. Também é aconselhável procurar na internet por respostas primeiro.

Se, ainda assim, você sentir necessidade de fazer uma pergunta e precisa de esclarecimentos, recomendamos o seguinte:

- Abra um [Problema](https://github.com/kaik-e/TechJob/issues/new).
- Forneça o máximo de contexto possível sobre o que você está encontrando.
- Forneça versões do projeto e da plataforma (nodejs, npm, etc), dependendo do que parecer relevante.

Nós cuidaremos do problema o mais rápido possível.

<!--
Você pode querer criar uma tag separada para perguntas e incluí-la nesta descrição. As pessoas devem então marcar seus problemas de acordo.

Dependendo de quão grande o projeto é, você pode querer delegar as perguntas, por exemplo, para o Stack Overflow ou Gitter. Você pode adicionar informações e formas de contato adicionais:
- IRC
- Slack
- Gitter
- Stack Overflow tag
- Blog
- FAQ
- Roadmap
- Lista de E-mails
- Fórum
-->

## Eu Quero Contribuir

> ### Aviso Legal <!-- omit in toc -->
> Ao contribuir para este projeto, você deve concordar que você criou 100% do conteúdo, que possui os direitos necessários sobre o conteúdo e que o conteúdo que você contribuir pode ser fornecido sob a licença do projeto.

### Reportando Bugs

<!-- omit in toc -->
#### Antes de Enviar um Relatório de Bug

Um bom relatório de bug não deve deixar os outros precisando de mais informações. Portanto, pedimos que você investigue cuidadosamente, colete informações e descreva o problema em detalhes no seu relatório. Por favor, complete as seguintes etapas antecipadamente para nos ajudar a corrigir qualquer possível erro o mais rápido possível.

- Certifique-se de que está usando a versão mais recente.
- Determine se o seu erro é realmente um bug e não um erro do seu lado, por exemplo, usando componentes/versões incompatíveis do ambiente (Certifique-se de que leu a [documentação](https://github.com/kaik-e/TechJob/blob/main/README.md). Se você está procurando suporte, talvez queira consultar [esta seção](#i-have-a-question)).
- Para ver se outros usuários já experimentaram (e possivelmente já resolveram) o mesmo problema, verifique se já existe um relatório de bug para o seu problema ou erro no [rastreador de bugs](https://github.com/kaik-e/TechJob/issues?q=label%3Abug).
- Também certifique-se de procurar na internet (incluindo Stack Overflow) para ver se usuários fora da comunidade GitHub discutiram o problema.
- Colete informações sobre o erro:
- Stack trace (Rastreamento)
- Sistema operacional, plataforma e versão (Windows, Linux, macOS, x86, ARM)
- Versão do interpretador, compilador, SDK, ambiente de execução, gerenciador de pacotes, dependendo do que for relevante.
- Possivelmente sua entrada e a saída
- Você consegue reproduzir o erro de forma confiável? E também consegue reproduzi-lo em versões anteriores?

<!-- omit in toc -->
#### Como Submeter um Bom Relatório de Bug?

> Nunca deve reportar problemas de segurança, vulnerabilidades ou bugs que envolvam informações sensíveis ao rastreador de problemas ou em qualquer outro lugar público. Ao invés disso, bugs sensíveis devem ser enviados por e-mail para .

<!-- Você pode adicionar uma chave PGP para permitir que as mensagens sejam enviadas de forma criptografada. -->

Usamos problemas do GitHub para rastrear bugs e erros. Se você encontrar um problema com o projeto:

- Abra um [Problema](https://github.com/kaik-e/TechJob/issues/new). (Como ainda não podemos ter certeza se é um bug ou não, pedimos que você não fale sobre o bug ainda e não marque o problema.)
- Explique o comportamento que você espera e o comportamento real.
- Por favor, forneça o máximo de contexto possível e descreva os *passos de reprodução* que alguém mais possa seguir para recriar o problema por conta própria. Isso geralmente inclui seu código. Para bons relatórios de bugs, você deve isolar o problema e criar um caso de teste reduzido.
- Forneça as informações que você coletou na seção anterior.

Depois que for enviado:

- A equipe do projeto rotulará o problema adequadamente.
- Um membro da equipe tentará reproduzir o problema com os passos fornecidos. Se não houver passos de reprodução ou se não houver uma maneira óbvia de reproduzir o problema, a equipe pedirá esses passos e marcará o problema como `needs-repro`. Problemas com a tag `needs-repro` não serão tratados até serem reproduzidos.
- Se a equipe conseguir reproduzir o erro, ele será marcado como `needs-fix`, além de outras tags (como `critical`), e o problema será deixado para ser [implementado por alguém](#your-first-code-contribution).

<!-- Você pode querer criar um template de problema para erros e falhas que pode ser usado como guia e define a estrutura das informações a serem incluídas. Se fizer isso, referencie-o aqui na descrição. -->


### Sugerindo Melhorias

Esta seção orienta sobre como enviar sugestões de melhorias para o TechJob, **incluindo recursos completamente novos e melhorias menores para funcionalidades existentes**. Seguir essas diretrizes ajudará os mantenedores e a comunidade a entender sua sugestão e encontrar sugestões relacionadas.

<!-- omit in toc -->
#### Antes de Enviar uma Sugestão de Melhoria

- Certifique-se de que está usando a versão mais recente.
- Leia a [documentação](https://github.com/kaik-e/TechJob/blob/main/README.md) cuidadosamente e descubra se a funcionalidade já está coberta, talvez por uma configuração individual.
- Realize uma [busca](https://github.com/kaik-e/TechJob/issues) para ver se a melhoria já foi sugerida. Se foi, adicione um comentário ao problema existente ao invés de abrir um novo.
- Descubra se a sua ideia se encaixa no escopo e nos objetivos do projeto. Cabe a você fazer um bom caso para convencer os desenvolvedores do projeto sobre os méritos dessa funcionalidade. Tenha em mente que queremos funcionalidades que sejam úteis para a maioria dos usuários, e não apenas para um pequeno grupo. Se você estiver mirando apenas uma minoria de usuários, considere escrever uma biblioteca de complemento/plugin.

<!-- omit in toc -->
#### Como Submeter uma Boa Sugestão de Melhoria?

Sugestões de melhorias são rastreadas como [problemas do GitHub](https://github.com/kaik-e/TechJob/issues).

- Use um **título claro e descritivo** para identificar a sugestão.
- Forneça uma **descrição passo a passo da melhoria sugerida** com o máximo de detalhes possível.
- **Descreva o comportamento atual** e **explique o comportamento que você esperava ver** e por que. Nesse ponto, você também pode dizer quais alternativas não funcionam para você.
- Você pode querer **incluir capturas de tela e GIFs animados** que ajudam a demonstrar os passos ou apontam como o comportamento pode ser melhorado.

---

Se precisar de mais ajuda, estou à disposição!
