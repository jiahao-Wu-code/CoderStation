import request from "./request";

/**
 * 获取所有分类的笔记标题
 */
export function getInterviewTitle() {
  return request({
    url: "/api/interview/interviewTitle",
    method: "GET",
  });
}

/**
 * 根据笔记 id 获取笔记
 */
export function getInterviewById(interviewId) {
  return request({
    url: `/api/interview/${interviewId}`,
    method: "GET",
  });
}