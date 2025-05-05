import { Image } from 'antd'
import { IMAGE_URL } from '../constants/images.js'

const characterMeta = [
  {
    section: "Thông Tin",
    fields: [
      { key: "vietName", label: "Tên Việt" },
      { key: "chineseName", label: "Tên Tiếng Trung" },
      { key: "englishName", label: "Tên Tiếng Anh" },
      { key: "otherName", label: "Tên Khác" },
      { key: "alias", label: "Bí Danh" },
      { key: "age", label: "Tuổi" },
      { key: "gender", label: "Giới Tính" },
      { key: "pseudonym", label: "Tên Giả" },
      { key: "status", label: "Tình Trạng" },
      { key: "causeOfDeath", label: "Nguyên Nhân Tử Vong" },
      { key: "betrothed", label: "Hôn Phu" }
    ]
  },
  {
    section: "Thế Lực",
    fields: [
      { key: "faction", label: "Phe Phái" },
      { key: "sect", label: "Tông Môn" },
      { key: "clan", label: "Gia Tộc" }
    ]
  },
  {
    section: "Nguồn Gốc",
    fields: [
      { key: "race", label: "Chủng Tộc" },
      { key: "bloodLine", label: "Huyết Mạch" },
      { key: "realm", label: "Lãnh Thổ / Quốc Gia" }
    ]
  },
  {
    section: "Sức Mạnh",
    fields: [
      { key: "cultivationRealm", label: "Cảnh Giới Tu Luyện" },
      { key: "bodyRealm", label: "Cảnh Giới Thân Thể" },
      { key: "combatPower", label: "Sức Mạnh" }
    ]
  },
  {
    section: "Khác",
    fields: [
      { key: "firstAppearance", label: "Xuất Hiện Lần Đầu" }
    ]
  }
];

const character = {
  vietName: "Đỗ Ti",
  chineseName: "拓森 (TuoSen)",
  otherName: "Ma Niệm Cổ Thần",
  age: 100000,
  gender: "Nam giới",
  faction: "Vương tộc Cổ Thần",
  race: "Cổ Thần",
  realm: "Cổ Thần Chi Địa",
  cultivationRealm: "Chu Tước Tinh",
  bodyRealm: "Côn Hư Tinh Vực",
  combatPower: "Bị phong ấn",
}

export const CharacterInfo = () => {
  return (
    <>
      <div className={'w-[220px]  border-1 border-purple-500-300'}>
        <div className={'text-center py-3 px-[9px] h-[2.5rem] bg-amber-200 font-bold'}>
          Vương Lâm
        </div>
        <Image src={`${IMAGE_URL}/tien nghich.jpg`} className={'  '}/>

        <div className="w-full border text-sm  -mt-1">
          {characterMeta.map((section, i) => {
            // Kiểm tra nếu tất cả các field trong section này đều không có giá trị
            const hasValidData = section.fields.some(({ key }) => character[key]);

            // Nếu không có giá trị hợp lệ thì bỏ qua section này
            if (!hasValidData) return null;

            return (
              <div key={i}>
                <div className="bg-purple-900 text-white font-bold px-3 py-2">{section.section}</div>
                {section.fields.map(({ key, label }, index) => {
                  const value = character[key];
                  if (!value) return null; // Bỏ qua nếu không có dữ liệu
                  return (
                    <div
                      key={key}
                      className={`grid grid-cols-6 px-3 py-3 text-left border-b text-xs border-purple-200 last:border-b-0`}
                    >
                      <div className="col-span-2 font-bold ">{label}</div>
                      <div className="col-span-4 ml-3">{value}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
