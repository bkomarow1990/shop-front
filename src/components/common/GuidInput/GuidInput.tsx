import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

interface GuidInputProps {
  onChange?: (value: string) => void;
  onSubmit: (values: any) => void;
  buttonText: string | null;
}

const GuidInput: React.FC<GuidInputProps> = ({ onChange, onSubmit, buttonText }) => {
  const [value, setValue] = useState<string>('');
  const validateGuid = (_: any, value: string, callback: (error?: string) => void) => {
    if (value && !/^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/.test(value)) {
      callback('Invalid GUID format');
    } else {
      callback();
    }
  };

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if(onChange){
      onChange(e.target.value);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label="Id"
        name="guid"
        rules={[
          { required: true, message: 'GUID is required' },
          { validator: validateGuid }
        ]}
      >
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder="Enter a GUID"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {buttonText ? buttonText : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GuidInput;