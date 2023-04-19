import React from 'react'

import styles from '../css/PageHeader.module.css'

/**
 * 每一页的页头
 * @returns 
 */
export default function PagerHeader(props) {
    return (
        <div className={styles.row}>
            <div className={styles.pageHeader}>
                {props.title}
            </div>
            {/* 分类选择 */}
            {props.children}
        </div>
    )
}
