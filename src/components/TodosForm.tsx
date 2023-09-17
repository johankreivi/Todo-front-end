import { Col, Form, Row, Input, Button } from 'antd';
import React from 'react';
import { Todo } from './models/Todo';
import { TodosFormsProps } from './models/TodosFormsProps';
import { PlusCircleFilled } from '@ant-design/icons';

const TodosForm: React.FC<TodosFormsProps> = (props) => {

    const [form] = Form.useForm();
    const { onFormSubmit } = props;

    const onFinish = () => {
        const todo: Todo = {
            title: form.getFieldsValue().title,
            completed: false
        };
        onFormSubmit(todo);
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