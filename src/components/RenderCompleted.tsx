import React from "react";
import { changeTodoStatus } from "../todoSlice";
import { Col, Row } from "antd";

const RenderCompleted: React.FC<{ text: boolean, record: any, dispatch: any, isEditing: (record: any) => boolean }> = ({ text, record, dispatch, isEditing }) => {

const editable = isEditing({id: record.id});
          return editable ? (
            <Row>
              <Col span={1}>
                <input 
                type="checkbox"
                checked={text}
                onChange={() => {
                  dispatch(changeTodoStatus({todo: {id: record.id, title : record.title, completed : !text, deadline: record.deadline}}
                  ));
                }}
                />
              </Col>
            </Row>
          ) : (
            <div className="completed">
              <input 
              type="checkbox"
              checked={text}
              onChange={() => {
                dispatch(changeTodoStatus({todo: {id: record.id, title : record.title, completed : !text}}
                ));
              }}
              />
            </div>
          );

        }

export default RenderCompleted;
