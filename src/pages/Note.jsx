import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviewTitleAsync } from '../redux/interviewSlice';
import { getTypeList } from '../redux/typeSlice';
import styles from '../css/Interview.module.css';
import PageHeader from '../components/PageHeader';
import { Tree, BackTop } from 'antd';
import { getInterviewById } from '../api/note';


function Note() {
    const dispatch = useDispatch()
    const { interviewTitleList } = useSelector(state => state.interview)
    const { typeList } = useSelector(state => state.type)
    console.log("14>>>>", interviewTitleList, typeList)
    const [treeData, setTreeData] = useState([])
    const [interviewInfo, setInterviewInfo] = useState(null)


    useEffect(() => {
        // 分类下的标题
        if (!interviewTitleList.length) {
            dispatch(getInterviewTitleAsync())
        }
        // 分类列表
        if (!typeList.length) {
            dispatch(getTypeList())
        }
        // console.log(interviewTitleList.length, typeList.length)
        // 组装成一个树状结构的数组
        if (interviewTitleList.length && typeList.length) {
            const arr = []
            // 分类标题
            for (let i = 0; i < typeList.length; i++) {
                arr.push({
                    title: (<h3>{typeList[i].typeName}</h3>),
                    key: i
                })
            }
            for (let i = 0; i < interviewTitleList.length; i++) {
                const childArr = []
                for (let j = 0; j < interviewTitleList[i].length; j++) {
                    childArr.push({
                        title: (<h4
                            style={{ fontWeight: '200' }}
                            onClick={() => clickHandle(interviewTitleList[i][j]._id)}
                        >{interviewTitleList[i][j].interviewTitle}</h4>),
                        key: `${i}-${j}`
                    })
                }
                arr[i].children = childArr
            }
            setTreeData(arr)
            console.log("arr>>>", arr)
        }
    }, [typeList, interviewTitleList])

    let interviewRightSide = null;
    if (interviewInfo) {
        interviewRightSide = (
            <div className={styles.content}>
                <h1 className={styles.interviewRightTitle}>{interviewInfo?.interviewTitle}</h1>
                <div className={styles.contentContainer}>
                    <div dangerouslySetInnerHTML={{ __html: interviewInfo?.interviewContent }}></div>
                </div>
            </div>
        );
    } else {
        interviewRightSide = (
            <div style={{
                textAlign: "center",
                fontSize: "40px",
                fontWeight: "100",
                marginTop: "150px"
            }}>
                请在左侧选择笔记
            </div>
        )
    }

    async function clickHandle(id) {
        const { data } = await getInterviewById(id)
        setInterviewInfo(data)
    }


    return (
        <div className={styles.container}>
            <PageHeader title="笔记" />
            <div className={styles.interviewContainer}>
                <div className={styles.leftSide}>
                    <Tree
                        treeData={treeData}
                    />
                </div>
                <div className={styles.rightSide}>
                    {interviewRightSide}
                </div>
                <BackTop />
            </div>
        </div>
    );
}

export default Note;