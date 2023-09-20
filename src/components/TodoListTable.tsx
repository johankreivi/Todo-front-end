import React from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setDefaultPageSize } from "../todoSlice";
import { RootState, AppDispatch } from "../store";

const TodoListTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, totalItems, defaultPageSize, loading } = useSelector((state: RootState) => state.todos);

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
        title: 'Actions',
        dataIndex: 'completed',
        key: 'completed',
        render: (text: boolean) => (
        <div className="completed">
            <input 
            type="checkbox"
            checked={text}
            onChange={() => {}}
            />
        </div>
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
