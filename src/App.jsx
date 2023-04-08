import { Layout } from 'antd';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import './css/App.css'
import RouterConfig from './router'
import LoginForm from './components/LoginForm';
import { useState } from 'react';


const { Header, Footer, Content } = Layout;

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  function loginHandle() {
    setIsModalOpen(true);
  }

  function closeModal(){
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      {/* 头部 */}
      <Header className="header">
        <NavHeader loginHandle={loginHandle} />
      </Header>
      {/* 匹配上的路由页面 */}
      <Content className="content">
        <RouterConfig />
      </Content>
      {/* 底部 */}
      <Footer className="footer">
        <PageFooter />
      </Footer>
      {/* 登录弹窗 */}
      <LoginForm isModalOpen={isModalOpen} onOk={loginHandle} closeModal={closeModal}/>
    </div>
  );
}

export default App;
