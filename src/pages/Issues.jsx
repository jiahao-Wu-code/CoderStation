import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import styles from '../css/Issue.module.css';
import { getIssueByPage } from '../api/issue';
import IssueItem from '../components/IssueItem';

function Issues() {

    // 获取到的列表数据
    const [issueInfo, setIssueInfo] = useState([])

    // 分页数据
    const [pageInfo, setPageInfo] = useState({
        current: 1, //当前页数
        pageSize: 10, //页容量
        total: 0 // 数据的总条数
    })

    useEffect(() => {
        async function fetchData() {
            const { data } = await getIssueByPage({
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
                issueStatus: true
            });
            console.log("25>>>", data)
            setIssueInfo(data.data);
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count
            })
        }
        fetchData();
    }, [pageInfo.current])

    // issue list
    let issueList = [];
    issueList = issueInfo.map(item => (<IssueItem key={item._id} issueInfo={item} />))
    // console.log("40>>>", issueList)



    return (
        <div className={styles.container}>
            {/* 上面的头部 */}
            <PageHeader title="问答列表" />
            {/* 下面的列表内容区 */}
            <div className={styles.issueContainer}>
                {/* 左边区域 */}
                <div className={styles.leftSide}>
                    {issueList}
                </div>
                {/* 右边区域 */}
                <div className={styles.rightSide}></div>
            </div>
        </div>
    );
}

export default Issues;