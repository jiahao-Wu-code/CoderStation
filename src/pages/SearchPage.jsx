import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from "../css/SearchPage.module.css"
import PageHeader from '../components/PageHeader'
import AddIssueBtn from '../components/AddIssueBtn'
import Recommend from '../components/Recommend'
import ScoreRank from '../components/ScoreRank'
import { getIssueByPage } from '../api/issue'
import SearchResult from '../components/SearchResult'
/**
 * 搜索结果页
 */
export default function SearchPage() {
    const location = useLocation()
    console.log("location: ", location.state)

    // 分页数据
    const [pageInfo, setPageInfo] = useState({
        current: 1, //当前页数
        pageSize: 10, //页容量
        total: 0 // 数据的总条数
    })
    // 存储搜索结果
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        async function fetchData(state) {
            const { value, searchOption } = state
            let searchParams = {
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
                issueStatus: true,
            }
            switch (searchOption) {
                case 'issue': {
                    searchParams.issueTitle = value
                    const { data } = await getIssueByPage(searchParams)
                    console.log("data >>>>", data)
                    // 更新搜索结果
                    setSearchData(data.data);
                    // 更新分页信息
                    setPageInfo({
                        current: data.currentPage,
                        pageSize: data.eachPage,
                        total: data.count,
                    });
                    break;
                }
                case 'book': {
                    break;
                }
            }
        }
        fetchData(location.state)
    }, [location.state])



    return (
        <div className='container'>
            <PageHeader title="搜索结果" />
            <div className={styles.searchPageContainer}>
                {/* 左边区域 */}
                <div className={styles.leftSide}>
                    {
                        searchData.map(item => (
                            <SearchResult info={item} key={item._id} />
                        ))
                    }
                </div>
                {/* 右边区域 */}
                <div className={styles.rightSide}>
                    <AddIssueBtn />
                    <div style={{ marginBottom: 20 }}>
                        <Recommend />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <ScoreRank />
                    </div>
                </div>
            </div>
        </div>
    )
}
