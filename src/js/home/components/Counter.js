/**采用ES6标准来写 */

import React, { Component, PropTypes } from 'react'

/**组件的定义 */
class Counter extends Component {
    /**属性类型的检查 */
    static propTypes = {
        value: PropTypes.number.isRequired,
        onInCrement: PropTypes.func.isRequired,
        onDeCrement: PropTypes.func.isRequired
    }

    incrementIfOdd = () => {
        if (this.props.value % 2 !== 0) {
            this.props.onInCrement();
        }
    }

    incrementAsync = () => {
        setTimeout(
            this.props.onInCrement,
            1000);
    }

    render() {
        const {value, onInCrement, onDeCrement} = this.props;
        return (
            <p>
                Clicked:{value}times
                {' '}
                <button onClick={onInCrement}>+
                </button>
                {' '}
                <button onClick={onDeCrement}>-
                </button>
                {' '}
                <button onClick={this.incrementIfOdd}>
                    Increment if odd
                </button>
                {' '}
                <button onClick={this.incrementAsync}>
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