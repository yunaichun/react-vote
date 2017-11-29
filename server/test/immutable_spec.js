import { expect } from 'chai'; //expect是chai的一种断言语句
import { List, Map } from 'immutable'; //immutable是一种不变的数据结构【类似数组的slice方法，原数组不变】

//测试的描述
describe('immutability', () => {
    /**
     * [Number类型]
    */
    describe('a number', () => {
        //定义自增函数
        function increment(currentState) {
            return currentState + 1;
        }
        //it是断言成立返回结果
        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43); //断言nextState===43
            expect(state).to.equal(42); //断言state===42
        });
    });
    /**
     * [List结构]
    */
    describe('A List', () => {
        //添加电影
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }
        //it是断言成立返回结果
        it('is immutable', () => {
            let state = List.of('Trainspotting', '28 Days Later');
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(List.of(
                'Trainspotting',
                '28 Days Later',
                'Sunshine'
            ));
            expect(state).to.equal(List.of(
                'Trainspotting',
                '28 Days Later'
            ));
        });
    });
    /**
     * [Map结构]
    */
    describe('a tree', () => {
        //添加电影
        function addMovie(currentState, movie) {
            return currentState.set( //map方法设置值得时候key需要添加双引号
                'movies',
                currentState.get('movies').push(movie)
            );
        }
        //it是断言成立返回结果
        it('is immutable', () => {
            let state = Map({ //Map方法赋值的时候，key不用添加双引号
                movies: List.of('Trainspotting', '28 Days Later')
            });
            let nextState = addMovie(state, 'Sunshine');
            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later',
                    'Sunshine'
                )
            }));
            expect(state).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later'
                )
            }));
        });
    });
});