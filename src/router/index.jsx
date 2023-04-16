import { Route, Routes, Navigate } from "react-router-dom";

// 引入页面
import Issues from '../pages/Issues';
import Books from '../pages/Books';
import Note from '../pages/Note';
import AddIssue from "../pages/AddIssue";
import IssueDetail from "../pages/IssueDetail";

function RouteConfig() {
    return (
        <Routes>
            <Route path="/issues" element={<Issues />} />
            <Route path="/books" element={<Books />} />
            <Route path="/note" element={<Note />} />
            <Route path="/addIssue" element={<AddIssue />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            <Route path="/" element={<Navigate replace to="/issues" />} />
        </Routes>
    )
}

export default RouteConfig;