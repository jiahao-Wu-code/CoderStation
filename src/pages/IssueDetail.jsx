import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIssueById } from '../api/issue';
import styles from '../css/IssueDetail.module.css'
import PagerHeader from '../components/PageHeader';
import Recommend from '../components/Recommend';
import ScoreRank from '../components/ScoreRank';
import { getUserById } from '../api/user';
import { formatDate } from '../utils/tools';

export default function IssueDetail() {
    const { id } = useParams();
    const [issueInfo, setissueInfo] = useState(null)
    const [userInfo, setuserInfo] = useState(null)
    const avatarUrl = 'https://img2.baidu.com/it/u=1540599851,1561697507&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    useEffect(() => {
        async function fetchData() {
            const { data } = await getIssueById(id);
            const result = await getUserById(data.userId)
            console.log("18", result)
            setuserInfo(result.data)
            setissueInfo(data)
        }
        fetchData();
    }, [])
    return (
        <div className={styles.container}>
            <PagerHeader title='问答详情' />
            <div className={styles.detailContainer}>
                {/* 左侧 */}
                <div className={styles.leftSide}>
                    {/* 详情 */}
                    <div className={styles.qusetion}>
                        {/* 标题 */}
                        <h1>{issueInfo?.issueTitle}</h1>
                        {/* 提问者信息 */}
                        <div className={styles.questioner}>
                            <img src={avatarUrl} className={styles.avatar} />
                            <span className={styles.user}>{userInfo?.nickname}</span>
                            <span>发布于：{formatDate(issueInfo?.issueDate)}</span>
                        </div>
                        {/* 问题详情 */}
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}></div>
                        </div>
                    </div>
                    {/* 评论 */}
                </div>

                {/* 右侧 */}
                <div className={styles.rightSide}>
                    <div style={{ marginBottom: 20 }}>
                        <Recommend />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <ScoreRank />
                    </div>
                </div>
            </div>
        </div >
    )
}
