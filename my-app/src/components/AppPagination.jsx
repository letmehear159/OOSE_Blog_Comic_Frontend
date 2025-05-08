import React from "react";
import { Pagination } from "antd";

const AppPagination = ({ current, total, pageSize, onChange }) => (
  <Pagination
    current={current}
    total={total}
    pageSize={pageSize}
    onChange={onChange}
    showSizeChanger={false}
  />
);
export default AppPagination;
