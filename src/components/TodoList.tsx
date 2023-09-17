import { Layout, Col, message, Row, Tabs } from 'antd';
import TodosForm from './TodosForm';
import React, { useCallback, useEffect } from 'react';
import { createTodo } from '../services/todoServices';
import { on } from 'events';
import { Todo } from './models/Todo';

const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList: React.FC = () => {

    const [refresh, setRefresh] = React.useState(false);

    const handleCreate = async (todo: Todo) => {
        await createTodo(todo);
        onRefresh();
        message.success('Todo created successfully!');
    };

    const onRefresh = useCallback(async () => {
        setRefresh(true);
        setRefresh(false);
    }, [refresh]);

    useEffect(() => {
    }, [onRefresh]);

    return (
<Layout className="layout">
    <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
            <Row>
                <Col span={12} offset={6}>
                    <h1>Todo List</h1>
                    <TodosForm onFormSubmit={handleCreate} />
                    <br />
                    <Tabs defaultActiveKey="all">
                        <TabPane tab="All" key="all">
                            </TabPane>
                            <TabPane tab="In Progress" key="inProgress">
                            </TabPane>
                            <TabPane tab="Completed" key="completed">
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