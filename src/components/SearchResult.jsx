import React from 'react'
import IssueItem from './IssueItem'
import BookItem from './BookItem'
/**
 * 搜索结果
 */
export default function SearchResult(props) {
    return (
        <div>
            {
                props.info.issueTitle ? <IssueItem issueInfo={props.info} /> : <BookItem bookInfo={props.info} />
            }
        </div>
    )
}
