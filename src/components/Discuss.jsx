import React, { useRef, useState, useEffect } from 'react'
import { Comment } from '@ant-design/compatible';
import { useSelector } from 'react-redux'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Form, Button, List, Tooltip } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { getIssueCommentById } from '../api/comment'
import { getUserById } from '../api/user';
import { formatDate } from '../utils/tools';



export default function Discuss(props) {
    const { useInfo, isLogin } = useSelector(state => state.user)
    const [commentList, setCommentList] = useState([])
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })
    const editorRef = useRef();
    let avatar = null;
    if (isLogin) {
        avatar = (<img src='https://img2.baidu.com/it/u=1540599851,1561697507&fm=253&fmt=auto&app=138&f=JPEG?w=50&h=50' />)
    } else {
        avatar = (<Avatar icon={<UserOutlined />} />)
    }

    useEffect(() => {
        async function fetchCommentList() {
            let data = null;
            if (props.commentType === 1) {
                // 获取问答评论
                const result = await getIssueCommentById(props.targetId, {
                    current: pageInfo.current,
                    pageSize: pageInfo.pageSize,
                });
                data = result.data;
            } else if (props.commnetType === 2) {
                // 获取书籍评论
            }
            for (let i = 0; i < data.data.length; i++) {
                const result = await getUserById(data.data[i].userId);
                // 将用户的信息添加到评论对象上面
                data.data[i].userInfo = result.data;
            }
            // 更新评论数据
            setCommentList(data.data);
            // 更新分页数据
            setPageInfo({
                currentPage: data.currentPage,
                eachPage: data.eachPage,
                count: data.count,
                totalPage: data.totalPage
            })
        }
        if (props.targetId) {
            fetchCommentList();
        }
    }, [props.targetId])



    return (
        <div>
            {/* 评论框 */}
            <Comment
                avatar={avatar}
                content={
                    <>
                        <Form.Item>
                            <Editor
                                initialValue=""
                                previewStyle="vertical"
                                height="300px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                language='zh-CN'
                                ref={editorRef}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" disabled={!isLogin}>添加评论</Button>
                        </Form.Item>
                    </>
                }
            />
            {/* 评论列表 */}
            {
                commentList?.length > 0
                &&
                <List
                    header="当前评论"
                    dataSource={commentList}
                    renderItem={(item) => (
                        <Comment
                            avatar={<Avatar src={item.userInfo.avatar} />}
                            content={
                                <div
                                    dangerouslySetInnerHTML={{ __html: item.commentContent }}
                                ></div>
                            }
                            datetime={
                                <Tooltip title={formatDate(item.commentDate, 'year')}>
                                    <span>{formatDate(item.commentDate, 'year')}</span>
                                </Tooltip>
                            }
                        />
                    )}
                />
            }
            {/* 分页 */}
        </div>
    )
}
