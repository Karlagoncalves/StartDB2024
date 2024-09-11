import { Animal } from "./animal.js"

const Bioma = {
    SAVANA: 'SAVANA',
    FLORESTA: 'FLORESTA',
    RIO: 'RIO',
    
};

const Animais = {
    LEAO: 'LEAO',
    LEOPARDO: 'LEOPARDO',
    CROCODILO: 'CROCODILO',
    MACACO: 'MACACO',
    GAZELA: 'GAZELA',
    HIPOPOTAMO: 'HIPOPOTAMO'
};

const ErrorCode = {
    ANIMAL_INVALIDO: 'Animal inválido',
    QUANTIDADE_INVALIDA: 'Quantidade inválida',
    RECINTO_INVIAVEL: 'Não há recinto viável'
};

const AnimaisObjeto = {
    LEAO: new Animal(Animais.LEAO, [Bioma.SAVANA], true, 3),
    LEOPARDO: new Animal(Animais.LEOPARDO, [Bioma.SAVANA], true, 2),
    CROCODILO: new Animal(Animais.CROCODILO, [Bioma.RIO], true, 3),
    MACACO: new Animal(Animais.MACACO, [Bioma.SAVANA, Bioma.FLORESTA], false, 1),
    GAZELA: new Animal(Animais.GAZELA, [Bioma.SAVANA], false, 2),
    HIPOPOTAMO: new Animal(Animais.HIPOPOTAMO, [Bioma.SAVANA, Bioma.RIO], false, 4)
}

export {Bioma, Animais, ErrorCode, AnimaisObjeto}