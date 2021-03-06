import * as React from 'react'
import { Form, Input, Button, Checkbox, Icon } from 'antd'
import { FormComponentProps } from 'antd/es/form'

const FormItem = Form.Item

export interface LoginFormData {
    email: string
    password: string
}

interface Props extends FormComponentProps {
    onSubmit: (value: LoginFormData) => void
}

class LoginForm extends React.Component<Props> {
    onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const form: LoginFormData = this.props.form.getFieldsValue() as LoginFormData
        this.props.onSubmit(form)
    }

    render() {
        const { form } = this.props
        const { getFieldDecorator } = form
        return (
            <Form onSubmit={this.onSubmit}>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your email!'
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="Username"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="/">
                        Forgot password
                    </a>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        Log in
                    </Button>
                    Or
                    <a href="/">register now!</a>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(LoginForm)
