import React, { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useReport } from '../context/ReportContext';

const REASONS = [
  'Nội dung phản cảm',
  'Spam',
  'Ngôn từ thù ghét',
  'Khác'
];

function ReportModal() {
  const { modalOpen, target, closeReport } = useReport();
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (modalOpen) {
      setReason('');
      setDetails('');
      setError('');
    }
  }, [modalOpen]);

  if (!modalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) {
      setError('Vui lòng chọn lý do báo cáo.');
      return;
    }
    if (reason === 'Khác' && !details.trim()) {
      setError('Vui lòng nhập chi tiết lý do.');
      return;
    }
    const reportData = {
      ...target,
      reason,
      details: reason === 'Khác' ? details : ''
    };
    console.log('Gửi báo cáo:', reportData);
    closeReport();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ExclamationCircleOutlined className="text-red-500" />
          Báo cáo vi phạm
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Chọn lý do báo cáo:
            </label>
            <div className="space-y-2">
              {REASONS.map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => { setReason(r); setError(''); }}
                    className="accent-red-600"
                  />
                  <span className="text-gray-800">{r}</span>
                </label>
              ))}
            </div>
          </div>
          {reason === 'Khác' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Nhập chi tiết:
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={details}
                onChange={e => { setDetails(e.target.value); setError(''); }}
                placeholder="Vui lòng mô tả chi tiết lý do báo cáo..."
              />
            </div>
          )}
          {error && (
            <div className="mb-3 text-red-600 text-sm">{error}</div>
          )}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={closeReport}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportModal;