import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

const ServerError500: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={<Link to={"/"}>Back Home</Link>}
  />
);

export default ServerError500;
