/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Form, DatePicker, Radio, InputNumber } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import moment, { Moment } from 'moment';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const RemainingLife: React.FC = () => {
  const [birth, setBirth] = React.useState(moment(new Date(), 'YYYY-MM-DD'));
  const [year, setYear] = React.useState(80);
  const [unit, setUnit] = React.useState(1);

  const onBirthChange = (value: Moment | null, dateString: string) => {
    setBirth(moment(new Date(dateString), 'YYYY-MM-DD'));
  };

  const onYearChange = (value: string | number | undefined) => {
    setYear(value as number);
  };

  const onUnitChange = (e: RadioChangeEvent) => {
    setUnit(e.target.value);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        padding: '15px',
      }}
    >
      <h1>Remaining Life</h1>
      <Form {...layout} initialValues={{ birth, year, unit }}>
        <Form.Item
          label="你的生日"
          name="birth"
          rules={[{ required: true, message: 'Please input' }]}
        >
          <DatePicker onChange={onBirthChange} />
        </Form.Item>
        <Form.Item
          label="理想岁数"
          name="year"
          rules={[{ required: true, message: 'Please input' }]}
        >
          <InputNumber min={1} max={120} onChange={onYearChange} />
        </Form.Item>
        <Form.Item
          label="单位"
          name="unit"
          rules={[{ required: true, message: 'Please input' }]}
        >
          <Radio.Group onChange={onUnitChange}>
            <Radio value={1}>年</Radio>
            <Radio value={2}>月</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      {unit === 1 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Array.from(Array(year)).map((item, index) => (
            <div
              key={index}
              style={{
                width: '50px',
                height: '50px',
                border: '1px solid #000',
                boxSizing: 'border-box',
                backgroundColor:
                  index + 1 <= new Date().getFullYear() - birth.year()
                    ? '#ccc'
                    : 'transparent',
              }}
            />
          ))}
        </div>
      ) : null}

      {unit === 2 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Array.from(Array(year * 12)).map((item, index) => (
            <div
              style={{
                width: '20px',
                height: '20px',
                border: '1px solid #000',
                boxSizing: 'border-box',
                backgroundColor:
                  index + 1 <=
                  new Date().getFullYear() * 12 +
                    new Date().getMonth() -
                    birth.year() * 12 -
                    birth.month()
                    ? '#ccc'
                    : 'transparent',
              }}
              key={index}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RemainingLife;
