import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviewTitleAsync } from '../redux/interviewSlice';
import { getTypeList } from '../redux/typeSlice';
import styles from '../css/Interview.module.css';
import PageHeader from '../components/PageHeader';
import { Tree } from 'antd';


function Note() {
    const dispatch = useDispatch()
    const { interviewTitleList } = useSelector(state => state.interview)
    const { typeList } = useSelector(state => state.type)
    console.log("14>>>>", interviewTitleList, typeList)
    const [treeData, setTreeData] = useState([])
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
                        title: (<h4>{interviewTitleList[i][j].interviewTitle}</h4>),
                        key: `${i}-${j}`
                    })
                }
                arr[i].children = childArr
            }
            setTreeData(arr)
            console.log("arr>>>", arr)
        }
    }, [typeList, interviewTitleList])


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
                    // TODO:
                </div>
            </div>
        </div>
    );
}

export default Note;