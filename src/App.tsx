import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import './App.scss';
import TodoList from "./components/TodoList";
import { ConfigProvider } from "antd";
import sv from "antd/lib/locale/sv_SE";
import "dayjs/locale/sv";

const App: React.FC = () => {
  return (
    <ConfigProvider locale={sv}>
    <Provider store={store}>
      <div className="App">
        <TodoList />
      </div>
    </Provider>
    </ConfigProvider>
  );
};

export default App;