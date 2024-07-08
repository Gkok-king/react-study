//用户页面
"use client";

import React, { CSSProperties } from "react";
import { Col, Flex, Layout, Row } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import style from "./homePage.module.less"; // 导入组件的 Less 样式

const HomePage = () => {
  return (
    <Layout className={style.layoutStyle}>
      <Sider width="25%" className={style.siderStyle}>
        Sider
      </Sider>
      <Layout>
        <Header className={style.headerStyle}>Header</Header>
        <Content className={style.contentStyle}>Content</Content>
        <Footer className={style.footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
