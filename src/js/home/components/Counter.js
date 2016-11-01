/**采用ES6标准来写 */

import React, { Component, PropTypes } from 'react'

/**组件的定义 */
class Counter extends Component {
    /**属性类型的检查 */
    static propTypes = {
        counter: PropTypes.number.isRequired,
        /**为函数，且必须存在 */
        increment: PropTypes.func.isRequired,
        incrementIfOdd: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired
    }

    render() {
        const {increment, incrementIfOdd, incrementAsync, decrement, counter} = this.props;
        return (
            <p>
                Clicked: {counter}times
                {' '}
                <button onClick={increment}>+
                </button>
                {' '}
                <button onClick={decrement}>-
                </button>
                {' '}
                <button onClick={incrementIfOdd}>
                    Increment if odd
                </button>
                {' '}
                <button onClick={incrementAsync}>
                    Increment async
                </button>
            </p>
        );
    }
}
/**默认导出ES6语法，文件名就是模块本身 */
export default Counter

/**exports与exports.module的区别 */
/**
 * 1.module.exports 初始值为一个空对象 {}
 * 2.exports 是指向的 module.exports 的引用
 * 3.require() 返回的是 module.exports 而不是 exports
 */