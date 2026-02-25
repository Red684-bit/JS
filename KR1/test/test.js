import { expect } from 'chai';
import {calc} from '../kr.js'

describe('Контрольная работа №1', function () {

  beforeEach(function () {
    if (typeof calc.clear === 'function') {
      calc.clear();
    }
  });

  describe('\n    ЗАДАНИЕ НА 3:', function () {

    describe('Метод last()', function () {

      it('Возвращает 0 если операций не было', function () {
        expect(calc.last()).to.equal(0);
      });

      it('Возвращает результат последней операции', function () {
        calc.add(5, 5);
        expect(calc.last()).to.equal(10);

        calc.div(10, 3);
        expect(calc.last()).to.equal(3.33);
      });
  });

    describe('Базовые операции с двумя аргументами', function () {

      it('add(): сложение двух чисел', function () {
        calc.add(2, 3);
        expect(calc.last()).to.equal(5);
        calc.add(1191, 987)
        expect(calc.last()).to.equal(2178);
        calc.add(-1, 1)
        expect(calc.last()).to.equal(0);
        calc.add(-5, -14)
        expect(calc.last()).to.equal(-19);
        calc.add(2, 0.3)
        expect(calc.last()).to.be.closeTo(2.3, 0.01);
        calc.add(-2, 0.7)
        expect(calc.last()).to.be.closeTo(-1.3, 0.01);
        calc.add(-5, -0.4)
        expect(calc.last()).to.be.closeTo(-5.4, 0.01);
        calc.add(0.1, 0.2)
        expect(calc.last()).to.be.closeTo(0.3, 0.01);
      });

      it('sub(): вычитание', function () {
        calc.sub(10, 4)
        expect(calc.last()).to.equal(6);
        calc.sub(5, 10)
        expect(calc.last()).to.equal(-5);
        calc.sub(-5, -2)
        expect(calc.last()).to.equal(-3);
        calc.sub(-5, -7)
        expect(calc.last()).to.equal(2);
      });

      it('mult(): умножение', function () {
        calc.mult(3, 4)
        expect(calc.last()).to.equal(12);
        calc.mult(-2, 5)
        expect(calc.last()).to.equal(-10);
        calc.mult(-2, -6)
        expect(calc.last()).to.equal(12);
        calc.mult(0.2, 5)
        expect(calc.last()).to.equal(1);
        calc.mult(0.2, 0.5)
        expect(calc.last()).to.be.closeTo(0.1, 0.01);
      });

      it('div(): деление с округлением до 2 знаков', function () {
        calc.div(10, 3)
        expect(calc.last()).to.equal(3.33);
        calc.div(7, 2)
        expect(calc.last()).to.equal(3.5);
        calc.div(1, 3)
        expect(calc.last()).to.equal(0.33);
        calc.div(10, 4)
        expect(calc.last()).to.equal(2.5);
      });

      it('intDiv(): целочисленное деление (//)', function () {
        calc.intDiv(10, 3)
        expect(calc.last()).to.equal(3);
        calc.intDiv(7, 2)
        expect(calc.last()).to.equal(3);
        calc.intDiv(5, 10)
        expect(calc.last()).to.equal(0);
      });
    });

  });

  describe('\n    ЗАДАНИЯ НА 4:', function () {

    describe('Граничные случаи', function () {

      it('div() на ноль', function () {
        expect(() => calc.div(10, 0)).to.not.throw();
        calc.div(10, 0)
        const result = calc.last();
        expect(result).to.satisfy(val =>
          val === Infinity || val === -Infinity
        );
      });

      it('intDiv() на ноль', function () {
        expect(() => calc.intDiv(5, 0)).to.not.throw();
      });

      it('Работа с отрицательными числами и нулями', function () {
        calc.add(-5, -3)
        expect(calc.last()).to.equal(-8);
        calc.mult(0, 100)
        expect(calc.last()).to.equal(0);
        calc.sub(0, 5)
        expect(calc.last()).to.equal(-5);
      });

      it('Округление div() работает корректно', function () {
        calc.div(1, 6)
        expect(calc.last()).to.equal(0.17);
        calc.div(2, 3)
        expect(calc.last()).to.equal(0.67);
        calc.div(5, 6)
        expect(calc.last()).to.equal(0.83);
      });
    });

      describe('Метод clear()', function () {

        it('Очищает историю и сбрасывает last result', function () {
          calc.add(5, 5);
          calc.mult(2);

          calc.clear();

          expect(calc.last()).to.equal(0);
          expect(calc.showHistory().trim()).to.equal('История пуста');
        });
      });

      describe('Вызов методов с одним аргументом', function () {

      it('add() c изначальным значением, add() с одним аргументом', function () {
        calc.add(2)
        expect(calc.last()).to.equal(2);
        calc.add(9)
        expect(calc.last()).to.equal(11);
        calc.add(2, 0.5);
        calc.add(5)
        expect(calc.last()).to.equal(7.5);
        calc.add(2.5)
        expect(calc.last()).to.equal(10);
      });

      it('mult(3) после sub(20, 5) должно дать 45', function () {
        calc.sub(20, 5);
        calc.mult(3)
        expect(calc.last()).to.equal(45);
      });

      it('Последовательные унарные вызовы', function () {
        calc.add(10, 5);
        calc.sub(3);
        calc.mult(2);
        expect(calc.last()).to.equal(24);
      });
    });


  });

  describe('\n    ЗАДАНИЯ НА 5:', function () {
    describe('Метод showHistory()', function () {

      it('Выводит "История пуста" при пустой истории', function () {
        const output = calc.showHistory();
        expect(output).to.be.a('string');
        expect(output.trim()).to.equal('История пуста');
      });

      it('Выводит историю в правильном формате', function () {
        calc.add(1, 3);
        calc.mult(5);

        const output = calc.showHistory();
        expect(output).to.include('История:');
        expect(output).to.include('1 + 3 = 4');
        expect(output).to.include('4 * 5 = 20');
      });

      it('Сохраняет правильный порядок операций', function () {
        calc.sub(10, 2);
        calc.add(5);
        calc.div(2);

        const output = calc.showHistory();
        const lines = output.split('\n').filter(l => l.includes('='));

        expect(lines[0]).to.match(/10\s*-\s*2\s*=\s*8/);
        expect(lines[1]).to.match(/8\s*\+\s*5\s*=\s*13/);
        expect(lines[2]).to.match(/13\s*\/\s*2\s*=\s*6\.5/);
      });
    });

    describe('Сброс истории при вызове с двумя аргументами', function () {

    it('После вызова с 2 аргументами история очищается и начинается новая', function () {
      calc.add(1, 2);
      calc.mult(5);

      calc.sub(10, 2);

      expect(calc.last()).to.equal(8);
      const historyOutput = calc.showHistory();
      expect(historyOutput).to.include('10 - 2 = 8');
      expect(historyOutput).to.not.include('1 + 2');
      expect(historyOutput).to.not.include('3 * 5');
    });
  });

    describe('Метод undo()', function () {

      it('Отменяет последнюю операцию', function () {
        calc.add(2, 3);
        calc.mult(4);

        calc.undo();

        expect(calc.last()).to.equal(5);
        const output = calc.showHistory();
        expect(output).to.include('2 + 3 = 5');
        expect(output).to.not.include('5 * 4 = 20');
      });

      it('Многократный undo', function () {
        calc.add(1, 1);
        calc.add(1);
        calc.add(1);

        calc.undo();
        expect(calc.last()).to.equal(3);

        calc.undo();
        expect(calc.last()).to.equal(2);

        calc.undo();
        expect(calc.last()).to.equal(0);
        expect(calc.showHistory().trim()).to.equal('История пуста');
      });

      it('undo на пустой истории не вызывает ошибок', function () {
        expect(() => calc.undo()).to.not.throw();
      });
    });

    describe('Интеграционный тест: полный сценарий', function () {

      it('Полный цикл работы калькулятора', function () {

        calc.add(10, 5);
        expect(calc.last()).to.equal(15);

        calc.mult(2);
        calc.sub(10);
        calc.div(3);

        expect(calc.last()).to.equal(6.67);

        const hist = calc.showHistory();
        expect(hist).to.include('10 + 5 = 15');
        expect(hist).to.include('15 * 2 = 30');
        expect(hist).to.include('30 - 10 = 20');
        expect(hist).to.include('20 / 3 = 6.67');

        calc.undo();
        expect(calc.last()).to.equal(20);

        calc.intDiv(100, 7);
        expect(calc.last()).to.equal(14);

        const newHist = calc.showHistory();
        expect(newHist).to.not.include('10 + 5');
        expect(newHist).to.include('100 // 7 = 14');

        calc.clear();
        expect(calc.showHistory().trim()).to.equal('История пуста');
      });
    });

  });
});