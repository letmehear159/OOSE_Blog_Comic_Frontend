import { useState } from 'react';
import { Upload, message, Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { beforeUpload, getBase64 } from '../../utils/imageUtils';

function AvatarUpload({ initialAvatar, onUpload }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialAvatar);

  // Giả định đang upload ảnh, chưa có api xử lý việc upload
  // Hiện tại nếu upload sẽ chỉ ở trạng thái loading
  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Tải lên</div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader flex justify-center"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Avatar
            src={imageUrl}
            size={100}
            className="rounded-full border-2 border-gray-200"
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <p className="mt-3 text-sm text-gray-500 text-center">
        Nhấn để thay đổi ảnh đại diện
      </p>
    </div>
  );
}

export default AvatarUpload;