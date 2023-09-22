import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Form, Input, InputNumber } from 'antd';
import { EditableCellProps } from './models/EditableCellProps';

const EditableCell: React.FC<EditableCellProps> = ({ dataIndex, title, inputType, record, children, ...restProps }) => {
  const editingKey = useSelector((state: RootState) => state.table.editingKey);
  const isEditing = record?.id === editingKey;


  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  
  return (
    <td {...restProps}>
      {isEditing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
