import { Layout, Col, Row, Tabs } from 'antd';
import TodosForm from './TodosForm';
import React, { useEffect } from 'react';
import TodoListTable from  './TodoListTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, setCurrentPage, setDefaultPageSize,  } from '../todoSlice'; // Adjust the import to your file structure
import { RootState, AppDispatch } from "../store";

const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { currentPage, defaultPageSize } = useSelector((state: RootState) => state.todos);
  
    const handlePageChange = (page: number, pageSize: number) => {
      dispatch(setCurrentPage(page));
      dispatch(setDefaultPageSize(pageSize));
      dispatch(fetchTodos({ page, pageSize }));
    };
  
    useEffect(() => {
      dispatch(fetchTodos({ page: currentPage, pageSize: defaultPageSize }));
    }, [dispatch, currentPage, defaultPageSize]);

    return (
<Layout className="layout">
    <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
            <Row>
                <Col span={12} offset={6}>
                    <h1>Todo List</h1>
                    <TodosForm />
                    <br />
                    <Tabs defaultActiveKey="all">
                        <TabPane tab="All" key="all">
                            <TodoListTable />
                        </TabPane>
                        <TabPane tab="In Progress" key="inProgress">
                            In progress
                        </TabPane>
                        <TabPane tab="Completed" key="completed">
                            Completed
                        </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </Content>
    </Layout>

    )
    }

export default TodoList;