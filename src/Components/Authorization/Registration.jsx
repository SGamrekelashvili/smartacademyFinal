import { gql, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";
import { Button, Col, Row, Form, Input, Typography } from "antd";
import "antd/dist/antd.css";
import "./styles";

const { Item } = Form;

export default function Registration(props) {
  const REGISTRATION_USER = gql`
    mutation register($input: UsersPermissionsRegisterInput!) {
      register(input: $input) {
        jwt
      }
    }
  `;
  const [registrationUser, { loading, error }] = useMutation(REGISTRATION_USER);
  const handleFormSubmit = async (value) => {
    const { data } = await registrationUser({
      variables: {
        input: {
          username: value.username,
          email: value.email,
          password: value.password,
        },
      },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    localStorage.setItem("accessRegToken", data.register.jwt);
    const d = localStorage.getItem("accessRegToken") || null;
    if (d != null) {
      props.setRegistered(true);
      localStorage.removeItem("accessRegToken");
      return <Redirect to="/" />;
    }
  };
  const [loginForm] = Form.useForm();

  if (props.Registered) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Col flex="auto">
        <div className="RegCenter">
          <Content>
            <Row justify="center">
              <Col>
                <div className="LoginText">
                  <Typography.Title className="textSpacing">
                    Smart Academy
                  </Typography.Title>
                  <Typography.Title level={5} className="centerText">
                    Please Complete to create your account.
                  </Typography.Title>
                </div>
                <Form form={loginForm} onFinish={handleFormSubmit}>
                  <Item name="FirstName">
                    <Input
                      className="input FirstName"
                      name="FirstName"
                      required
                      placeholder="FirstName"
                      type="FirstName"
                      bordered
                    />
                    <Input
                      className="input LastName"
                      name="LastName"
                      required
                      placeholder="LastName"
                      type="LastName"
                      bordered
                    />
                  </Item>

                  <Item name="username">
                    <Input
                      className="input"
                      name="username"
                      required
                      placeholder="Username"
                      type="username"
                      bordered
                    />
                  </Item>

                  <Item name="email">
                    <Input
                      className="input"
                      name="email"
                      required
                      placeholder="Email"
                      type="email"
                      bordered
                    />
                  </Item>

                  <Item name="password">
                    <Input
                      className="input"
                      name="password"
                      placeholder="password"
                      type="password"
                    />
                  </Item>
                  <Item
                    name="ConfrimPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      className="input"
                      name="ConfrimPassword"
                      placeholder="ConfrimPassword"
                      type="password"
                    />
                  </Item>
                  <Button
                    html
                    htmlType="submit"
                    required
                    type="primary"
                    block={true}
                    loading={loading}
                    className="registrationSignUp"
                  >
                    SIGN UP
                  </Button>
                </Form>
                <div className="alreadyLogIn">
                  <props.Link to="/">
                    <p> Already have a account? Log in</p>
                  </props.Link>
                </div>
              </Col>
            </Row>
          </Content>
        </div>
      </Col>
    </>
  );
}
