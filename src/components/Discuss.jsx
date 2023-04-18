import React, { useRef, useState, useEffect } from 'react'
import { Comment } from '@ant-design/compatible';
import { useSelector } from 'react-redux'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Form, Button, List, Tooltip, message, Pagination } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { getIssueCommentById } from '../api/comment'
import { getUserById } from '../api/user';
import { formatDate } from '../utils/tools';
import { addComment } from '../api/comment';
import { updateIssue } from '../api/issue';
import { useDispatch } from 'react-redux';
import { updateUserInfoAsync } from '../redux/userSlice';
import styles from "../css/Discuss.module.css"



export default function Discuss(props) {
    const { userInfo, isLogin } = useSelector(state => state.user)
    const [commentList, setCommentList] = useState([])
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
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
    }, [props.targetId, refresh])

    function onSubmit() {
        let newComment = null
        if (props.commentType === 1) {
            // 新增问答评论
            newComment = editorRef.current.getInstance().getHTML()
            if (newComment === '<p><br></p>') {
                newComment = ''
            }
        } else if (props.commentType === 2) {
            // 书籍评论
        }
        if (!newComment) {
            message.warning("请输入评论内容")
            return
        }
        addComment({
            userId: userInfo._id,
            typeId: props.issueInfo ? props.issueInfo.typeId : props.bookInfo.typeId,
            commentContent: newComment,
            commentType: props.commentType,
            bookId: null,
            issueId: props.targetId
        });
        message.success("评论成功");
        setRefresh(!refresh);
        editorRef.current.getInstance().setHTML("");


        // 更新该问答评论数
        updateIssue(props.targetId, {
            commentNumber: props.issueInfo ? ++props.issueInfo.commentNumber : ++props.bookInfo.commentNumber
        });


        // 更新积分的变化
        dispatch(updateUserInfoAsync({
            userId: userInfo._id,
            newInfo: {
                points: userInfo.points + 4
            }
        }));

    }

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
                            <Button type="primary" disabled={!isLogin} onClick={onSubmit}>添加评论</Button>
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
            {
                commentList.length > 0 ? (
                    <div className={styles.paginationContainer}>
                        <Pagination
                            showQuickJumper
                            defaultCurrent={1}
                            total={pageInfo.total}
                        />
                    </div>
                ) : (
                    <div style={{
                        fontWeight: "200",
                        textAlign: "center",
                        margin: "50px"
                    }}
                    >暂无评论</div>
                )
            }
        </div>
    )
}
