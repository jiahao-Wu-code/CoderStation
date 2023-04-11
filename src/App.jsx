import { Layout, message } from 'antd';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import './css/App.css'
import RouterConfig from './router'
import LoginForm from './components/LoginForm';
import { useEffect, useState } from 'react';
import { getInfo, getUserById } from './api/user';
import { changeLoginStatus, initUserInfo } from './redux/userSlice';
import { useDispatch } from 'react-redux';


const { Header, Footer, Content } = Layout;

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch();

  // 恢复用户登录状态
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      (async () => {
        const result = await getInfo();
        if (result.data) {
          // token 有效
          // 获取 id 对应的用户信息，存储到状态仓库
          const { data } = await getUserById(result.data._id);
          // 存储到仓库
          dispatch(initUserInfo(data));
          dispatch(changeLoginStatus(true))
        } else {
          // token 过期
          message.warning(result.msg);
          localStorage.removeItem('userToken');
        }
      })()
    }
  }, [])

  function loginHandle() {
    setIsModalOpen(true);
  }

  function closeModal() {
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
      <LoginForm isModalOpen={isModalOpen} onOk={loginHandle} closeModal={closeModal} />
    </div>
  );
}

export default App;
