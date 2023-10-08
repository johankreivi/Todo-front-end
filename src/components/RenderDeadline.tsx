import React from "react";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import { changeTodoDeadline } from "../todoSlice";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const RenderDeadline: React.FC<{ text: string, record: any, dispatch: any, isEditing: (record: any) => boolean }> = ({ text, record, dispatch, isEditing }) => {

const editable = isEditing({id: record.id});
        return editable ? (
          <div className="deadline">
            <DatePicker 
            showTime
            showSecond={false}
            placeholder={text}
            allowClear={true}
            defaultValue={record.deadline !== null ? dayjs(record.deadline).utc(true) : undefined}
            onOk={(date) => {
              dispatch(changeTodoDeadline({todo: {id: record.id, title: record.title, completed: record.completed, deadline: dayjs(date).utc(true).toISOString()}}) );
            }}
            size="small"
            />
          </div>
        ) : (
          <div className="deadline" >
            {record.deadline !== null ? dayjs(record.deadline).utc(true).format("YYYY-MM-DD HH:mm") : "ingen deadline"}
          </div>
        );

    }

    export default RenderDeadline;