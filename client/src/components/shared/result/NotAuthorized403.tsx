import React from "react";
import {  Result } from "antd";
import { Link } from "react-router-dom";

const NotAuthorized403: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link to={"/"} >Back Home</Link>}
  />
);

export default NotAuthorized403;
