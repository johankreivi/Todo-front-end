import React from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setDefaultPageSize, changeTodoStatus} from "../todoSlice";
import { RootState, AppDispatch } from "../store";
import { Todo } from "./models/Todo";
import e from "express";

const TodoListTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, totalItems, defaultPageSize, loading, currentPage } = useSelector((state: RootState) => state.todos);

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
            //todo: Todo, page: number, pageSize: number
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
        render: (text: string, record: Todo) => (
        <span>
            <a style={{ marginRight: 16 }}>Edit</a>
            <a>Delete</a>
        </span>
        ),
    },
];

  return (
    <div style={{ padding: "20px" }}>
      <h2>The list of all lists:</h2>
      <Table
        dataSource={data}
        columns={columns}
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
    </div>
  );
};

export default TodoListTable;
