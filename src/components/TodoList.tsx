import { Layout, Col, Row, Tabs} from 'antd';
import TodosForm from './TodosForm';
import React, { useEffect } from 'react';
import TodoListTable from  './TodoListTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../todoSlice'; // Adjust the import to your file structure
import { RootState, AppDispatch } from "../store";
import { setActiveTab } from "../tabSlice";

const { Content } = Layout;

const TodoList: React.FC = () => {
    const tabItems = [
        {
            label: 'All',
            key: 'all',
            children: <TodoListTable />,
        },
        {
            label: 'In Progress',
            key: 'uncompleted',
            children: <TodoListTable />,
        },
        {
            label: 'Completed',
            key: 'completed',
            children: <TodoListTable />,
        },
      ];

    const dispatch: AppDispatch = useDispatch();
    const { currentPage, defaultPageSize } = useSelector((state: RootState) => state.todos);
    const { activeTab } = useSelector((state: RootState) => state.tab);
  
    useEffect(() => {
      dispatch(fetchTodos({ page: currentPage, pageSize: defaultPageSize, filter: activeTab }));
    }, [dispatch, currentPage, defaultPageSize, activeTab]);

    return (
<Layout className="layout">
    <Content>
        <div className="site-layout-content">
            <Row>
                <Col span={22} offset={1}>
                    <h1>Todo List</h1>
                    <TodosForm />
                    <br />
                    <Tabs defaultActiveKey={activeTab} items={tabItems} onChange={

                        (key) => {
                            dispatch(setActiveTab(key));
                        }
                        } />
                </Col>
            </Row>
        </div>
    </Content>
</Layout>

    )
};

export default TodoList;