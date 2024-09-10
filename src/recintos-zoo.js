import { Animal } from "./animal.js"
import { Bioma, Animais, ErrorCode } from "./constants.js";


class RecintosZoo {
    constructor() {
        //Instanciando para criar a classe Animal
        this.animais = {
            LEAO: new Animal(Animais.LEAO, [Bioma.SAVANA], true, 3),
            LEOPARDO: new Animal(Animais.LEOPARDO, [Bioma.SAVANA], true, 2),
            CROCODILO: new Animal(Animais.CROCODILO, [Bioma.RIO], true, 3),
            MACACO: new Animal(Animais.MACACO, [Bioma.SAVANA, Bioma.FLORESTA], false, 1),
            GAZELA: new Animal(Animais.GAZELA, [Bioma.SAVANA], false, 2),
            HIPOPOTAMO: new Animal(Animais.HIPOPOTAMO, [Bioma.SAVANA, Bioma.RIO], false, 4)
        };

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

    getEspacoOcupado(animaisExistente) {
        //Verificar o espaco ocupado e acrescenta +1 em caso exista animais existentes
        let espacoOcupado = 0;
        for (const animal of animaisExistente) {
            const animalDefinido = this.animais[animal.especie];

            return espacoOcupado += animalDefinido.tamanho * animal.quantidade;

        }

        return espacoOcupado;
    }

    isBiomaCompativel(biomaRecinto, biomaAnimal) {
        //Verifica se o bioma do animal é compativel com o bioma
        //do recinto

        for (const biomaAnimalNovo of biomaAnimal) {
            if (biomaRecinto.includes(biomaAnimalNovo)) {
                return true
            }
        }

        return false;
    }

    isRecintoCompativel(recinto, animal) {

        //Verifica se o animal existente é carnivoro
        //let recintoCarnivoro = false

        if (recinto.animaisExistentes.length == 0) {
            return true
        }

        const isAnimalCarnivoro = animal.isCarnivoro


        for (const animalExistente of recinto.animaisExistentes) {
            const animalExtRecinto = animalExistente.especie

            console.log("animal exist: " + animalExistente.especie)
            console.log("thisAnimalCarnivoro: " + this.animais[animal.isCarnivoro])
            console.log("Animal.Carnivoro: " + animal.isCarnivoro)
            console.log("Animal: " + animal)


            console.log("animal if: " + this.animais[animalExtRecinto].isCarnivoro)

            const isAnimalCarnivoroRecin = this.animais[animalExtRecinto].isCarnivoro

            if (isAnimalCarnivoro == false && isAnimalCarnivoroRecin == false) {
                console.log("animal if dentro: " + this.animais[animalExtRecinto].isCarnivoro)

                return true
            }

            if (isAnimalCarnivoro && isAnimalCarnivoroRecin) {
                console.log("animal else dentro: " + this.animais[animalExtRecinto].isCarnivoro)
                return true

            }

            if (isAnimalCarnivoro == false && isAnimalCarnivoroRecin == true) {
                console.log("animal else dentro: " + this.animais[animalExtRecinto].isCarnivoro)
                return false

            }

            if (isAnimalCarnivoro == true && isAnimalCarnivoroRecin == false) {
                console.log("animal else dentro: " + this.animais[animalExtRecinto].isCarnivoro)
                return false

            }


        }


        return true
    }



    getEspacoNecessario(animal, quantidade) {
        //Verifica se existe espaço suficiente
        return animal.tamanho * quantidade;
    }

    totalEspacoExtra(recinto, animal) {
        //Espaco Extra para especie difirente

        for (const item of recinto.animaisExistentes) {
            if (item.especie != animal) {
                return 1
            }
        }

        return 0
    }


    aceitaAnimal(recinto, animal, quantidade) {
        //verifica se tem hipopotamo e se o bioma é savana e rio

        if (animal == Animais.HIPOPOTAMO) {
            for (const item of recinto.animaisExistentes) {

                if (item.especie != Animais.HIPOPOTAMO) {
                    return recinto.bioma.includes(Bioma.SAVANA) && recinto.bioma.includes(Bioma.RIO)
                }
            }
        }

        if (animal == Animais.MACACO) {
            return recinto.animaisExistentes.length > 0 || quantidade > 1
        }

        return true

    }



    analisaRecintos(animal, quantidade) {

        const animalObj = this.animais[animal]
        console.log("Animal.obg: " + animalObj)


        if (!animalObj) {
            return { erro: ErrorCode.ANIMAL_INVALIDO };
        }

        if (quantidade <= 0) {
            return { erro: ErrorCode.QUANTIDADE_INVALIDA };
        }

        const recintosViaveis = [];


        for (const recinto of this.recintos) {
            const espacoLivre = recinto.tamanhoTotal - this.getEspacoOcupado(recinto.animaisExistentes);
            const biomaCompativel = this.isBiomaCompativel(recinto.bioma, animalObj.bioma);
            const recintoCompativel = this.isRecintoCompativel(recinto, animalObj)
            const aceitaAnimal = this.aceitaAnimal(recinto, animal, quantidade)
            const espacoTotalNecessario = this.getEspacoNecessario(animalObj, quantidade) + this.totalEspacoExtra(recinto, animal)

            const novoEspacoLivre = espacoLivre - espacoTotalNecessario

            console.log(recinto)

            console.log("espaco livre  " + espacoLivre)

            console.log("bioma compativel  " + biomaCompativel)

            console.log("recinto  " + recintoCompativel)

            console.log("tolera outro animal " + aceitaAnimal)

            console.log("espaco total necessario " + espacoTotalNecessario)

            console.log("novo espaco livre " + novoEspacoLivre)

            console.log("------------")




            if (biomaCompativel && aceitaAnimal && recintoCompativel && novoEspacoLivre >= 0) {

                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${novoEspacoLivre} total: ${recinto.tamanhoTotal})`);
            }


        }

        if (recintosViaveis.length === 0) {
            return { erro: ErrorCode.RECINTO_INVIAVEL };
        }

        return { recintosViaveis };



    }



}


const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos('MACACO', 2));



export { RecintosZoo as RecintosZoo };





