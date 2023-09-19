import { Table, Pagination} from "antd";
import React, {useEffect, useState} from "react";
import { Todo } from "./models/Todo";
import { TodoListTableProps } from "./models/TodoListTableProps";
import { getTodoCount, getTodos } from "../services/todoServices";

const TodoListTable: React.FC<TodoListTableProps> = (props) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [defaultPageSize, setDefaultPageSize] = useState(10);
  // Columns for the AntD table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
    },
    // Add more columns as needed
  ];

  // Fetch data from the API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await getTodoCount();
        setTotalItems(count);
        const result = await getTodos(currentPage, defaultPageSize);

        setData(result);
        console.log(result);
      } catch (error) {
        console.error('There was an error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage, defaultPageSize]); // Empty dependency array means this effect will only run once, similar to componentDidMount

  return (
    <div style={{ padding: '20px' }}>
      <h1>Data Table</h1>
      <Table dataSource={data} columns={columns} rowKey="id" pagination={
        { 
            total: totalItems,
            pageSize: defaultPageSize,
            onChange: (page, defaultPageSize) => {
                setCurrentPage(page);
                setDefaultPageSize(defaultPageSize);
            },
            showSizeChanger: true,
            showQuickJumper: true,
            defaultCurrent: 1,
            pageSizeOptions: ['3', '5', '10', '20', '50', '100'],
            hideOnSinglePage: true,
        }}>
            <Table.Column title="Completed" dataIndex="completed" key="completed"  />
        </Table>
    </div>
  );
}

export default TodoListTable;