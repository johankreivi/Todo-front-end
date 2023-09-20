import { Col, Form, Row, Input, Button } from 'antd';
import React from 'react';
import { Todo } from './models/Todo';
import { PlusCircleFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { createNewTodo } from '../todoSlice';
import { RootState } from '../store';

const TodosForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { currentPage, defaultPageSize } = useSelector((state: RootState) => state.todos);
    const [form] = Form.useForm();

    const onFinish = () => {
        console.log('Success:' + form.getFieldsValue().title);
        const todo: Todo = {
            title: form.getFieldsValue().title,
            completed: false
        };
        
        dispatch(createNewTodo({ todo, page: currentPage, pageSize: defaultPageSize }));

        form.resetFields();
    }

    return (
        <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="todo-form"
        >
            <Row
            gutter={16}>
                <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Please enter todo title' }]}
                    >
                        <Input placeholder="Please enter todo title" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            <PlusCircleFilled rev={undefined}  /> Add Todo
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default TodosForm;