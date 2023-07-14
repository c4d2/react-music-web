import { createContext, useContext, useReducer } from "react";

// 用于组件之间的共享状态
export const StateContext = createContext();

// 用于将状态管理的上下文提供给应用程序的所有组件
export const StateProvider = ({ children, initialState, reducer }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// 使用useContext函数来获取stateContext上下文对象
export const useStateProvider = () => useContext(StateContext);