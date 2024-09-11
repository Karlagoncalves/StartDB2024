import { Bioma, Animais, ErrorCode, AnimaisObjeto } from "./constants.js";


class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: [Bioma.SAVANA], tamanhoTotal: 10, animaisExistentes: [{ especie: Animais.MACACO, quantidade: 3 }] },
            { numero: 2, bioma: [Bioma.FLORESTA], tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: [Bioma.SAVANA, Bioma.RIO], tamanhoTotal: 7, animaisExistentes: [{ especie: Animais.GAZELA, quantidade: 1 }] },
            { numero: 4, bioma: [Bioma.RIO], tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: [Bioma.SAVANA], tamanhoTotal: 9, animaisExistentes: [{ especie: Animais.LEAO, quantidade: 1 }] },
        ];
    }

    recintos = []
    animais = []

    analisaRecintos(animal, quantidade) {

        const animalObj = AnimaisObjeto[animal]

        if (!animalObj) {
            return { erro: ErrorCode.ANIMAL_INVALIDO };
        }

        if (quantidade <= 0) {
            return { erro: ErrorCode.QUANTIDADE_INVALIDA };
        }

        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const biomaCompativel = this.isBiomaCompativel(recinto.bioma, animalObj.bioma);
            const aceitaAnimal = this.aceitaAnimal(recinto, animal, quantidade);
            const recintoCompativel = this.isRecintoCompativel(recinto, animalObj);
            const espacoTotalNecessario = this.getEspacoNecessarioAnimal(animalObj, quantidade) + this.getEspacoExtraNecessario(recinto, animal);
            const espacoLivre = recinto.tamanhoTotal - this.getEspacoOcupado(recinto.animaisExistentes);
            const espacoLivreRestante = espacoLivre - espacoTotalNecessario;

            if (biomaCompativel && aceitaAnimal && recintoCompativel && espacoLivreRestante >= 0) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivreRestante} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: ErrorCode.RECINTO_INVIAVEL };
        }

        return { recintosViaveis };

    }

    isBiomaCompativel(biomaRecinto, biomaAnimal) {
        for (const bioma of biomaAnimal) {
            if (biomaRecinto.includes(bioma)) {
                return true;
            }
        }

        return false;
    }

    aceitaAnimal(recinto, animal, quantidade) {
        if (animal == Animais.HIPOPOTAMO) {
            for (const animalExistente of recinto.animaisExistentes) {
                if (animalExistente.especie != Animais.HIPOPOTAMO) {
                    return recinto.bioma.includes(Bioma.SAVANA) && recinto.bioma.includes(Bioma.RIO)
                }
            }
        }

        if (animal == Animais.MACACO) {
            return recinto.animaisExistentes.length > 0 || quantidade > 1
        }

        return true
    }

    isRecintoCompativel(recinto, animal) {
        if (recinto.animaisExistentes.length > 0) {
            const isAnimalCarnivoro = animal.isCarnivoro
            const especieAnimalRecinto = recinto.animaisExistentes[0].especie
            const isAnimalRecintoCarnivoro = AnimaisObjeto[especieAnimalRecinto].isCarnivoro

            if (!isAnimalCarnivoro && isAnimalRecintoCarnivoro) {
                return false
            }

            if (isAnimalCarnivoro && !isAnimalRecintoCarnivoro) {
                return false
            }
        }

        return true
    }

    getEspacoNecessarioAnimal(animal, quantidade) {
        return animal.tamanho * quantidade;
    }

    getEspacoExtraNecessario(recinto, animal) {
        for (const animalExistente of recinto.animaisExistentes) {
            if (animalExistente.especie != animal) {
                return 1
            }
        }

        return 0
    }

    getEspacoOcupado(animaisExistente) {
        let espacoOcupado = 0;

        for (const animal of animaisExistente) {
            const animalDefinido = AnimaisObjeto[animal.especie];
            return espacoOcupado += animalDefinido.tamanho * animal.quantidade;
        }

        return espacoOcupado;
    }

}

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos('MACACO', 2));

export { RecintosZoo as RecintosZoo };





