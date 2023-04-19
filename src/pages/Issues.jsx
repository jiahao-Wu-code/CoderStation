import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import styles from '../css/Issue.module.css';
import { getIssueByPage } from '../api/issue';
import IssueItem from '../components/IssueItem';
import { Pagination } from 'antd';
import AddIssueBtn from '../components/AddIssueBtn';
import Recommend from '../components/Recommend';
import ScoreRank from '../components/ScoreRank';
import TypeSelect from '../components/TypeSelect';
import { useSelector } from 'react-redux';


function Issues() {

    // 获取到的列表数据
    const [issueInfo, setIssueInfo] = useState([])

    // 分页数据
    const [pageInfo, setPageInfo] = useState({
        current: 1, //当前页数
        pageSize: 10, //页容量
        total: 0 // 数据的总条数
    })
    const { issueTypeId } = useSelector(state => state.type)

    useEffect(() => {
        async function fetchData() {
            let searchParams = {
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
                issueStatus: true,
            }
            if (issueTypeId !== 'all') {
                // 用户点击了分类的，那么就需要根据分类来渲染
                searchParams.typeId = issueTypeId;
                // 如果按照分类来进行查询，需要重新将当前页设置为第一页
                searchParams.current = 1;
            }
            const { data } = await getIssueByPage(searchParams);
            // console.log("25>>>", data)
            setIssueInfo(data.data);
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count
            })
        }
        fetchData();
    }, [pageInfo.current, pageInfo.pageSize, issueTypeId])

    // issue list
    let issueList = [];
    issueList = issueInfo.map(item => (<IssueItem key={item._id} issueInfo={item} />))
    // console.log("40>>>", issueList)

    /**
     * 处理分页
     * @param {*} current 
     * @param {*} pageSize 
     */
    function handlePageChange(current, pageSize) {
        setPageInfo({
            current,
            pageSize
        })
    }



    return (
        <div className={styles.container}>
            {/* 上面的头部 */}
            <PageHeader title="问答列表">
                <TypeSelect />
            </PageHeader>
            {/* 下面的列表内容区 */}
            <div className={styles.issueContainer}>
                {/* 左边区域 */}
                <div className={styles.leftSide}>
                    {issueList}
                    {
                        issueInfo.length > 0 ? (
                            <div className="paginationContainer">
                                <Pagination
                                    showQuickJumper
                                    defaultCurrent={1}
                                    {...pageInfo}
                                    onChange={handlePageChange}
                                />
                            </div>
                        ) : (
                            <div className={styles.noIssue}>有问题，就来 coder station！</div>
                        )
                    }
                </div>
                {/* 右边区域 */}
                <div className={styles.rightSide}>
                    <AddIssueBtn />
                    <Recommend />
                    <ScoreRank />
                </div>
            </div>
        </div>
    );
}

export default Issues;