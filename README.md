# Setup Guide

```shell
npm instal --registry=https://registry.npm.taobao.org

// 这一步会自动打开浏览器窗口，默认启动在 8000 端口，可通过设置 PORT 环境变量修改监听的端口
// 使用该命令启动后会默认启用 *热替换*, 也就是说当修改代码后，无需重新执行该命令
npm start
```

# Develop Guide

## Commit Message

https://github.com/inetfuture/technote#commit-message-规范

## Coding Style

### javascript

- https://github.com/airbnb/javascript

对以上规则的改进和补充：

- 总是使用 arrow functions ，无论在哪个位置，除非影响了类继承。
- 类成员排序：静态属性、静态方法、实例属性、`constructor` 、实例方法，公开方法尽量写在私有方法前面。
- 私有成员要加下划线前缀。

### react

- 组件成员排序：`propTypes` 、`defaultProps` 、`state` 、`constructor` 、生命周期方法、其它方法、事件处理方法、render 方法，除 `state` 外的实例属性初始化放在 `constructor` 内。
- `propTypes` 排序：其它属性、方法属性、样式属性。
- 事件处理方法、styles 等声明尽量按 UI 组件排列顺序或者交互顺序。
- `defaultProps` ：
    - 对于 redux connected component ，不要使用 `defaultProps` ，应该使用 redux 中的 `getInitialState()` 。
    - 必需的属性不需要声明默认值。
- 在 `componentDidMount` 中调 API 初始化数据而非 `componentWillMount` 。
- 事件处理方法命名规则为 `on` + 动词 + 名词，上下文很简单的情况下名词可省略，比如 `onPressSignIn` 、`onPress` 。
- 性能：
    - 不要在 render 中进行大量计算，计算结果应该缓存到 state 中。
    - 尽量实现 `componentShouldUpdate` 方法减少不必要的刷新。
- 向其它模块 `dispatch` action 必须经由目标模块导出的 action creator ，不能直接 `dispatch({ type: 'xxx' })` 。
- 在 action creator ，redux connected component 中不要使用 `store` 访问 `dispatch` ，`state` ，而应该直接使用框架传入的：

    ```js
    // state.js
    import store from '../../store';

    export doSomething = () => {
        return async (dispatch, getState) => {
            // 错误的：
            store.dispatch();
            store.getState();

            // 正确的：
            dispatch();
            getState();
        }
    }

    // index.js
    import * as otherModuleActions from '../OtherModule/state';

    @connect(
        (state) => { return { ...state.someModule, otherModule: state.otherModule }; }
    )
    class SomeModule extends Component {
        _onPress = () => {
            // 错误的：
            store.dispatch();
            store.getState();

            // 正确的：
            this.props.dispatch(otherModuleActions.whatever());
            this.props.otherModule;
        }
    }
    ```

## Logging

- https://github.com/inetfuture/technote/blob/master/logging.md

# References

- javascript
    - http://es6.ruanyifeng.com/ ，先看这些章节：2，3，4，7，9，14，18，19，21
    - https://lodash.com/docs/4.17.4
- nodejs
    - https://github.com/github/fetch
- react
    - https://ant.design/docs/react/introduce-cn
    - https://pro.ant.design/docs/getting-started-cn
    - https://github.com/dvajs/dva
    - https://github.com/sorrycc/roadhog
    - https://webpack.js.org/guides/
    - http://redux.js.org/
    - https://reacttraining.com/react-router/web/guides/philosophy

# Tools

- vscode
    - https://code.visualstudio.com/
- react
    - https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US
