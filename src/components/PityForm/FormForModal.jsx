import React, {useEffect} from "react";
import {Col, Form, Modal} from "antd";
import getComponent from './index';

const {Item: FormItem} = Form;

const FormForModal = ({
                        title,
                        width,
                        left,
                        right,
                        top,
                        formName,
                        record,
                        onFinish,
                        loading,
                        fields,
                        visible,
                        onCancel,
                        offset = 0,
                        children,
                        Footer,
                        onTest
                      }) => {
  const [form] = Form.useForm();
  const onOk = () => {
    form.validateFields().then((values) => {
      onFinish(values);
    })
  }

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(record);
  }, [record]);

  const layout = {
    labelCol: {span: left},
    wrapperCol: {span: right},
  }

  let style = {
    marginTop: offset,
  };
  if (top !== undefined) {
    style.top = top;
  }

  return (
    <Modal style={style}
           confirmLoading={loading}
           footer={Footer !== undefined ? <Footer onOk={onOk} onCancel={onCancel} onTest={() => {
             form.validateFields().then((values) => {
               onTest(values);
             })
           }}/> : undefined}
           title={title} width={width} visible={visible} onOk={onOk} onCancel={onCancel}>
      {children || null}
      <Form
        form={form}
        {...layout}
        name={formName}
        initialValues={record}
        onFinish={onFinish}
      >
        {
          fields.map((item, index) => <Col span={item.span || 24} key={index}>
            <FormItem label={item.label} colon={item.colon || true} initialValue={item.initialValue}
                      rules={
                        [{required: item.required, message: item.message}]
                      } name={item.name} valuePropName={item.valuePropName || 'value'}
            >
              {getComponent(item.type, item.placeholder, item.component)}
            </FormItem>
          </Col>)
        }
      </Form>
    </Modal>
  )

}
export default FormForModal;
