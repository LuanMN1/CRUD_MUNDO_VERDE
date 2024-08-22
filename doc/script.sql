CREATE DATABASE MundoVerde;
USE MundoVerde;

CREATE TABLE Produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(60) NOT NULL,
    categoria INT NOT NULL,
    preco FLOAT NOT NULL,
    quantidade INT NOT NULL,
    url VARCHAR(255)
);

INSERT INTO Produtos VALUES (1, 'Granola com castanhas 1Kg',0,40.18,6,'cereais.png');
INSERT INTO Produtos VALUES (2, 'Whey Protein 907g',1,379.38,10,'suplementos.png');
INSERT INTO Produtos VALUES (3, 'Alho em pó',2,5.18,15,'temperos.png');