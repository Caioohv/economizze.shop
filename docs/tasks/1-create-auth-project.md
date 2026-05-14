Para o projeto atual, com base em @docs, precisamos criar um projeto próprio para lidar com a autenticação e autorização.
O projeto deve ser capaz de gerenciar usuários, autenticação e autorização de forma segura e eficiente.
A autorização se refere a permissão que determinado usuário tem de executar uma ação dentro de um site.

O usuário admin tem todas as permissões.

As permissões são granulares, definidas por quem o criou. A principio, lidaremos com uma lista mais seleta: [users, products, metrics], com :read, :write (create, update, delete). essa lista deve ser expansível futuramente.
Ao expandir a lista, os usuários não admin devem ter as permissões RESTRITAS (negadas) por padrão.
Apenas o usuário ADMIN receberá como permitida.

O "REGISTRAR" deve ser feito apenas por usuários internos.
O usuário admin pode criar outros usuários admins ou comuns
O usuário comum só pode criar outros usuários comuns, NUNCA um admin.

O ADMIN pode criar outros usuários com permissões iguais a ele (criar novos administradores do site)
O ADMIN pode criar outros usuários com permissões mais restritas (ex. apenas para um site especifico)
O Usuário criado pode criar outros usuários com permissões iguais a ele (criar novos administradores do site)
O Usuário criado pode criar outros usuários com permissões mais restritas (ex. apenas para uma função específica)

Se eu, caio, crio um usuário felipe, e eu perco a permissão de um site, felipe também deve perder essa permissão.

O Admin pode remover a permissão de um usuário em qualquer site.
O Admin pode remover um usuário do sistema.

O usuário pode remover os usuários que ele criou.
O usuário não pode remover os usuários que não ele criou.
O usuário pode adicionar e remover as permissões de usuários que ele criou.
O usuário não pode adicionar ou remover as permissões de usuários que não ele criou.


