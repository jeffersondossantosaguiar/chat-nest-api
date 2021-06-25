CHAT com WebSocket

[] Notificar usuário nova mensagem em um grupo de conversa
[] Notificar usuário que uma mensagem enviada chegou ao destinatario
[] Notificar usuário que uma mensagem enviada foi lida

Minha ideia: conectar o usuário em um canal para cada grupo de conversa que ele tem. Ai enviariamos essas notificacoes pra esses grupos de conversa.
EX: 

Grupo de Conversa 1 - ID => 3d3eaa9e-6f8a-4913-b5df-47003e0be3a5
Grupo de Conversa 2 - ID => ec835e78-c1d1-432f-9842-a361f408c82b
Grupo de Conversa 3 - ID => 686e5929-dee8-4ba9-b3f0-592900beec55

A gente deixaria o usuário conectado a esses 3 canais.


API
[] Envio de nova mensagem para um grupo de conversa
[] Envio de confirmação de chegada da mensagem
[] Envio de confirmação de leitura da mensagem

[] Listar grupo de conversas
[] Criar grupo de conversas
[] Adicionar um/varios usuários em um grupo de conversa já existente
[] Remover usuário de grupo de conversa já existente