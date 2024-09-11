import { RecintosZoo } from "./recintos-zoo.js";
import { Bioma } from "./constants.js";
import { Animais, AnimaisObjeto } from "./constants.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });


    test('isRecintoCompativel deve retornar true quando recinto estiver vazio', () => {

        const recintoVazio = { numero: 2, bioma: [Bioma.FLORESTA], tamanhoTotal: 5, animaisExistentes: [] }
        const animal = AnimaisObjeto.MACACO

        const resultado = new RecintosZoo().isRecintoCompativel(recintoVazio, animal);

        expect(resultado).toBe(true);
    });

    test('isRecintoCompativel deve retornar true quando recinto for carnivoro e animal carnivoro', () => {

        const recintoCarnivoro = { numero: 5, bioma: [Bioma.SAVANA], tamanhoTotal: 9, animaisExistentes: [{ especie: Animais.LEAO, quantidade: 1 }]}
        const animal = AnimaisObjeto.LEOPARDO

        const resultado = new RecintosZoo().isRecintoCompativel(recintoCarnivoro, animal);

        expect(resultado).toBe(true);
    });

    test('isRecintoCompativel deve retornar false quando recinto for nao carnivoro e animal carnivoro', () => {

        const recintoNaoCarnivoro = { numero: 3, bioma: [Bioma.SAVANA, Bioma.RIO], tamanhoTotal: 7, animaisExistentes: [{ especie: Animais.GAZELA, quantidade: 1 }] }
        const animal = AnimaisObjeto.LEAO

        const resultado = new RecintosZoo().isRecintoCompativel(recintoNaoCarnivoro, animal);

        expect(resultado).toBe(false);
    });

});

