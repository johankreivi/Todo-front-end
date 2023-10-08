import React from "react";
import {  Form, Table, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveData, setCurrentPage, setDefaultPageSize, deleteData} from "../todoSlice";
import { setEditingKey } from "../tableSlice";
import { RootState, AppDispatch } from "../store";
import { Todo } from "./models/Todo";
import EditableCell from "./EditableCell";
import RenderTitle from "./RenderTitle";
import RenderCompleted from "./RenderCompleted";
import RenderDeadline from "./RenderDeadline";
import RenderAction from "./RenderAction";

const TodoListTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, totalItems, defaultPageSize, loading, currentPage } = useSelector((state: RootState) => state.todos);

  const editingKey = useSelector((state: RootState) => state.table.editingKey);
  const [form] = Form.useForm();

  const isEditing = (record: {id?: number | undefined }) => record.id === editingKey;
  const edit = (record: any) => {
    form.setFieldsValue({
      ...record
    });

    dispatch(setEditingKey(record.id));
  };

  const deleteTodo = async (record : Todo) => {
    dispatch(deleteData({data : record, page: currentPage, pageSize: defaultPageSize}));
  };


  const cancel = () => {
    dispatch(setEditingKey(-1));
  };

  const save = async (record : Todo) => {
    try {
      await form.validateFields();
      const newData : Todo = {id : record.id, title: form.getFieldsValue().title, completed : record.completed, deadline: record.deadline};
      await dispatch(saveData({data : newData, page: currentPage, pageSize: defaultPageSize}));
      dispatch(setEditingKey(-1));
      }
    catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    }
    ,
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text: string) => <RenderTitle text={text} />,
        editable: true,
    },
    {
        title: 'Done',
        dataIndex: 'completed',
        key: 'completed',
        render: (text: boolean, record: Todo) => <RenderCompleted text={text} record={record} dispatch={dispatch} isEditing={isEditing} />,
        
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (text: string, record: Todo) => <RenderDeadline text={text} record={record} dispatch={dispatch} isEditing={isEditing} />,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: any) => <RenderAction record={record} isEditing={isEditing} edit={edit} deleteTodo={deleteTodo} save={save} cancel={cancel} editingKey={editingKey} />,
},
];

const mergedColumns = columns.map(col => {
  if (!col.editable) {
    return col;
  }
  return {
    ...col,
    onCell: (record: any) => ({
      record,
      inputType: col.dataIndex === "age" ? "number" : "text",
      dataIndex: col.dataIndex,
      title: col.title,
      editing: record.id,
    })
  };
});

  return (
    <Col >
      <h2>The list of all lists:</h2>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowKey="id"
          loading={loading}
          pagination={{
            total: totalItems,
            pageSize: defaultPageSize,
            onChange: (page, pageSize) => {
              if (pageSize) {
                dispatch(setCurrentPage(page));
                dispatch(setDefaultPageSize(pageSize));
              }
            },
            showSizeChanger: true,
            showQuickJumper: true,
            defaultCurrent: 1,
            pageSizeOptions: ['3', '5', '10', '20', '50', '100'],
            hideOnSinglePage: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}>

          </Table>
        </Form>
    </Col>
  );
};

export default TodoListTable;
