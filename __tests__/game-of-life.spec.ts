import { GameOfLife } from '../src/game-of-life';
import { GameOfLifePattern } from '../src/game-of-life-patterns';

describe('GameOfLife', () => {
    it('should not change if contains only empty cells', () => {
        const game = GameOfLifePattern.empty(10);
        const gameExpected =  GameOfLifePattern.empty(10);

        game.next();
        expect(game).toEqual(gameExpected);
    });

    it('should not change if contains only still block', () => {
        const game = GameOfLifePattern.block();
        const gameExpected = GameOfLifePattern.block();

        game.next();
        expect(game).toEqual(gameExpected);
    });

    it('should change if contains blinker oscilator with period 2', () => {
        const game = GameOfLifePattern.blinker();
        const gameExpected = GameOfLifePattern.blinker();

        game.next();
        expect(game).not.toEqual(gameExpected);
    });

    it('should look the same after 2 iterations for blinker oscilator with period 2', () => {
        const game = GameOfLifePattern.blinker();
        const gameExpected = GameOfLifePattern.blinker();

        game.next();
        game.next();
        expect(game).toEqual(gameExpected);
    });

    it('should not be the same as initial for 23 iterations for glider', () => {
        const game = GameOfLifePattern.glider();
        const gameExpected = GameOfLifePattern.glider();

        for(let i = 0; i < 23; i++) {
            game.next();
            expect(game).not.toEqual(gameExpected);
        }
    });

    it('should get to the initial state after 24 iterations for glider', () => {
        const game = GameOfLifePattern.glider();
        const gameExpected = GameOfLifePattern.glider();

        for(let i = 0; i < 24; i++) {
            game.next();
        }
        
        expect(game).toEqual(gameExpected);
    });
});
