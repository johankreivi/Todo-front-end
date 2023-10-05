import { Layout, Col, Row, Tabs, Typography } from 'antd';
import TodosForm from './TodosForm';
import React, { useEffect } from 'react';
import TodoListTable from  './TodoListTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, setCurrentPage, setDefaultPageSize  } from '../todoSlice'; // Adjust the import to your file structure
import { RootState, AppDispatch } from "../store";
import { setActiveTab } from "../tabSlice";
import Item from 'antd/es/list/Item';

const { TabPane } = Tabs;
const { Content } = Layout;
const { Title } = Typography;



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
  
    const handlePageChange = (page: number, pageSize: number) => {
      dispatch(setCurrentPage(page));
      dispatch(setDefaultPageSize(pageSize));
      dispatch(fetchTodos({ page, pageSize }));
    };
  
    useEffect(() => {
        const testing = { page: currentPage, pageSize: defaultPageSize, filter: activeTab };
        console.log(testing);
      dispatch(fetchTodos({ page: currentPage, pageSize: defaultPageSize, filter: activeTab }));
    }, [dispatch, currentPage, defaultPageSize, activeTab]);

    return (
<Layout className="layout">
    <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
            <Row>
                <Col span={12} offset={6}>
                    <h1>Todo List</h1>
                    <TodosForm />
                    <br />
                    <Tabs defaultActiveKey={activeTab} items={tabItems} onChange={

                        (key) => {
                            dispatch(setActiveTab(key));

                            console.log(activeTab);

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