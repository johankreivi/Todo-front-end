import React from "react";
import { Typography, Popconfirm, Row } from "antd";

const RenderAction: React.FC<{ record: any, isEditing: (record: any) => boolean, edit: (record: any) => void, deleteTodo: (record: any) => void, save: (record: any) => void, cancel: () => void, editingKey: number | string }> = ({ record, isEditing, edit, deleteTodo, save, cancel, editingKey }) => {


const editable = isEditing(record);
          return editable ? (
            <>
              <Row>
                <Typography.Link onClick={() => save(record)} style={{marginRight: 8,}}>
                  Save
                </Typography.Link>
              </Row>
              <Row>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <Typography.Link>Cancel</Typography.Link>
                </Popconfirm>
              </Row>
            </>
          ) : (
            <>
              <Row>
                <Typography.Link disabled={editingKey !== -1} onClick={() => edit(record)}>
                Edit
                </Typography.Link>
              </Row>
              <Row>
                <Typography.Link disabled={editingKey !== -1} onClick={() => deleteTodo(record)}>
                Delete
                </Typography.Link>
              </Row>
            </>
          );
          }
          export default RenderAction;