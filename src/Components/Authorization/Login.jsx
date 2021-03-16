import { gql, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";
import { Button, Col, Row, Form, Input, Typography } from "antd";
import "antd/dist/antd.css";
import "./styles";

const { Item } = Form;

const Login = (props) => {
  const LOGIN_USER = gql`
    mutation login($input: UsersPermissionsLoginInput!) {
      login(input: $input) {
        jwt
      }
    }
  `;

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (value) => {
    const { data } = await loginUser({
      variables: {
        input: {
          identifier: value.email,
          password: value.password,
        },
      },
    });
    if (loading) return console.log(`loading ${error}`);
    localStorage.setItem("accessSmartToken", data.login.jwt);
    console.log(data);
    props.setLoggedIn(true);
  };

  const [loginForm] = Form.useForm();

  if (props.LoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Col flex="auto">
        <div className="LogIncenter">
          <Content>
            <Row justify="center">
              <Col>
                <div className="LoginText">
                  <Typography.Title className="textSpacing">
                    Smart Academy
                  </Typography.Title>
                  <Typography.Title level={5} className="centerText">
                    Welcome Back! Please LogIn To Your Account.
                  </Typography.Title>
                </div>
                <Form form={loginForm} onFinish={handleFormSubmit}>
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
                  <Button
                    html
                    htmlType="submit"
                    required
                    type="primary"
                    block={true}
                    loading={loading}
                    className="LogIn"
                  >
                    Login
                  </Button>
                  <Button className="SignUp">
                    <props.Link to="/reg">Sing Up</props.Link>
                  </Button>
                </Form>
              </Col>
            </Row>
          </Content>
        </div>
      </Col>
    </>
  );
};
export default Login;
