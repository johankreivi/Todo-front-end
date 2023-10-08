import { Col, Form, Row, Input, Button, DatePicker} from 'antd';
import React from 'react';
import { Todo } from './models/Todo';
import { PlusCircleFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { createNewTodo } from '../todoSlice';
import { RootState } from '../store';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const TodosForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { currentPage, defaultPageSize } = useSelector((state: RootState) => state.todos);
    const [form] = Form.useForm();

    const onFinish = () => {
        console.log("deadline: " + dayjs(form.getFieldsValue().deadline).utc(true).toISOString());
        const todo: Todo = {
            title: form.getFieldsValue().title,
            deadline: form.getFieldsValue().deadline !== undefined ? dayjs(form.getFieldsValue().deadline).utc(true).toISOString() : undefined,
            completed: false
        };
        console.log("deadline: " + todo.deadline);
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
                            <PlusCircleFilled rev={undefined}  /> Add
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item
                    name="deadline"
                    rules={[{ required: false, message: 'Please select deadline' }]}

                    >

                        <DatePicker placeholder="Deadline?" allowClear showTime showSecond={false} defaultValue={undefined} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default TodosForm;