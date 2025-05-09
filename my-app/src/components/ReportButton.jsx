import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useReport } from '../context/ReportContext';

function ReportButton({ targetType, targetId }) {
  const { openReport } = useReport();
  return (
    <button
      type="button"
      className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium gap-1"
      onClick={() => openReport(targetType, targetId)}
    >
      <ExclamationCircleOutlined className="text-base" />
      Báo cáo
    </button>
  );
}

export default ReportButton;