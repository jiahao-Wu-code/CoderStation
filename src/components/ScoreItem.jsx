import { useState } from 'react';
import { Avatar } from "antd";
import classname from "classnames";
import styles from "../css/ScoreItem.module.css"


function ScoreItem(props) {

    const [classNameCollection] = useState({
        "iconfont": true,
        "icon-jiangbei": true
    })


    let rankNum = null;
    switch (props.rank) {
        case 1: {
            rankNum = (
                <div style={{
                    color: "#ffda23",
                    fontSize: "22px",
                }} className={classname(classNameCollection)}></div>
            )
            break;
        }
        case 2: {
            rankNum = (
                <div style={{
                    color: "#c5c5c5",
                    fontSize: "22px"
                }} className={classname(classNameCollection)}></div>
            )
            break;
        }
        case 3: {
            rankNum = (
                <div style={{
                    color: "#cd9a62",
                    fontSize: "22px"
                }} className={classname(classNameCollection)}></div>
            )
            break;
        }
        default: {
            rankNum = (<div className={styles.rank}>{props.rank}</div>)
        }
    }
    // 头像
    const avatarUrl = "https://img0.baidu.com/it/u=3338107645,257455606&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1681491600&t=d06a8dfa55cf6c601591d1c608570cfd"

    return (
        <div className={styles.container}>
            {/* 名次，头像和昵称 */}
            <div className={styles.left}>
                {rankNum}
                <div className={styles.avatar}>
                    <Avatar size="small" src={avatarUrl} />
                </div>
                <div className={styles.nickname}>{props.rankInfo.nickname}</div>
            </div>
            {/* 积分 */}
            <div className={styles.right}>
                {props.rankInfo.points}
            </div>
        </div>
    );
}

export default ScoreItem;