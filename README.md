COMO RODAR O PROJETO:


1 - Ter o docker instalado na máquina;

2 - Entrar no diretório raiz do projeto (pasta "project_ngcash");

3 - Após clique em "Terminal" na barra de atalhos do VScode, localizada do parte superior direita, e clique em "Novo Terminal" (atalho "Ctrl" + "J" - linux);

4 - Executar o comando abaixo no terminal aberto no passo "3", sem as aspas:
    "docker-compose up -d" //para subir a aplicação por containers//
    "docker-compose down" //para descer a aplicação por containers//
    
5 - Após concluído o processo confirme se todos os container estarão "UP", com o seguinte comando:
    "docker ps -a"
    
6 - Se estiver tudo "UP" acesse pelo navegador o link abaixo e teste a aplicação:
    http://localhost:3000
