import React from "react";
import {  Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveData, setCurrentPage, setDefaultPageSize, changeTodoStatus} from "../todoSlice";
import { setEditingKey } from "../tableSlice";
import { RootState, AppDispatch } from "../store";
import { Todo } from "./models/Todo";
import EditableCell from "./EditableCell";

const TodoListTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, totalItems, defaultPageSize, loading, currentPage } = useSelector((state: RootState) => state.todos);
  const editingKey = useSelector((state: RootState) => state.table.editingKey);
  const [form] = Form.useForm();

  const isEditing = (record: { id: number }) => record.id === editingKey;
  console.log(editingKey);
  const edit = (record: any) => {
    form.setFieldsValue({
      ...record
    });

    dispatch(setEditingKey(record.id));
  };

  const cancel = () => {
    dispatch(setEditingKey(-1));
  };

  const save = async (record : Todo) => {
    try {
      console.log(form.getFieldsValue().title);
      await form.validateFields();
      const newData : Todo = {id : record.id, title: form.getFieldsValue().title, completed : record.completed};
      console.log(newData);
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
        render: (text: string) => <a>{text}</a>,
        editable: true,
    },
    {
        title: 'Completed',
        dataIndex: 'completed',
        key: 'completed',
        render: (text: boolean, record: Todo) => (
        <div className="completed">
            <input 
            type="checkbox"
            checked={text}
            onChange={() => {
              dispatch(changeTodoStatus({todo: {id: record.id, title : record.title, completed : !text}, page: currentPage, pageSize: defaultPageSize}
              ));
            }}
            />
        </div>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_ : any, record : any) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== -1} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          );
        },
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
    <div style={{ padding: "20px" }}>
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
    </div>
  );
};

export default TodoListTable;
