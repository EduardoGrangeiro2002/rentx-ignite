## RENTX Aluguéis de carros ##

# Cadastro do Carro

**RF** => Requisitos funcionais
Deve ser possivel cadastrar um novo carro.
Deve ser possível listar todas a categorias de carro.


**RN** => Regras de negócio
Não deve ser possivel cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possivel listar todos os carros disponíveis.
Deve ser possível listar todos os carros pelo nome da categoria.
Deve ser possível listar todos os carros pelo nome da marca.
Deve ser possível listar todos os carros pelo nome da carro.



**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação do carro

**RF**
Deve ser possível cadastrar uma especificação para o carro.


**RN**
Não deve ser possivel cadastrar uma specificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do Carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload de arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel


**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar  um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar  um novo aluguel caso já exista um aberto para o mesmo carro.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

