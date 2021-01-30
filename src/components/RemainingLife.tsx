import React from 'react';
import { Form, DatePicker, Radio, InputNumber } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import moment, { Moment } from 'moment';
import { v4 } from 'uuid';
import styles from './remaining-life.scss';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const RemainingLife: React.FC = () => {
  const [birth, setBirth] = React.useState(moment(new Date(), 'YYYY-MM-DD'));
  const [year, setYear] = React.useState(80);
  const [unit, setUnit] = React.useState(1);

  const onBirthChange = (_value: Moment | null, dateString: string) => {
    setBirth(moment(new Date(dateString), 'YYYY-MM-DD'));
  };

  const onYearChange = (value: number | string | undefined | null) => {
    setYear(value as number);
  };

  const onUnitChange = (e: RadioChangeEvent) => {
    setUnit(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Remaining Life</h1>
      <Form
        labelCol={layout.labelCol}
        wrapperCol={layout.wrapperCol}
        initialValues={{ birth, year, unit }}
      >
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
        <div className={[styles['age-area'], styles.year].join(' ')}>
          {Array.from(Array(year)).map((_item, index) => (
            <div
              key={v4()}
              className={[
                styles.item,
                index + 1 <= new Date().getFullYear() - birth.year()
                  ? styles.past
                  : '',
              ].join(' ')}
            />
          ))}
        </div>
      ) : null}

      {unit === 2 ? (
        <div className={[styles['age-area'], styles.month].join(' ')}>
          {Array.from(Array(year * 12)).map((_item, index) => (
            <div
              className={[
                styles.item,
                index + 1 <=
                new Date().getFullYear() * 12 +
                  new Date().getMonth() -
                  birth.year() * 12 -
                  birth.month()
                  ? styles.past
                  : '',
              ].join(' ')}
              key={v4()}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RemainingLife;
