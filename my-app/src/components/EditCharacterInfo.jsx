import { characterMeta } from '../meta/CharacterMeta.jsx'
import ClickableImageUpload from './ImageUpload.jsx'
import React, { useState } from 'react'
import { IMAGE_URL } from '../constants/images.js'
import { Button, Divider, Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form.js'

export const EditCharacterInfo = ({ character, setCharacter }) => {
  const [form] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOk = () => {
    setIsModalOpen(false)
    form.submit()
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleEdit = () => {
    setIsModalOpen(true)

  }
  const onSaveInfo = (values) => {
    // Lọc để chỉ lấy nhưng field có giá trị
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) => value !== undefined && value !== null && String(value).trim() !== ''
      )
    )
    setCharacter({ ...filteredValues })
  }

  return (
    <>
      <Modal title="Sửa đổi: Thông tin tổng quan nhân vật" className={'text-center'} width="1000px" open={isModalOpen}
             okText={'Lưu thông tin'} cancelText={'Hủy lưu'}
             onOk={handleOk} onCancel={handleCancel}>
        <Divider></Divider>
        <div className={'grid grid-cols-12 overflow-y-scroll'} style={{ height: '800px' }}>
          <div className={'col-span-4 mr-5 bg-amber-200'}>
            Hello
          </div>
          <div className={'col-span-8  px-5'}>
            <Form layout={'vertical'} className={'font-bold'} form={form} onFinish={(values) => onSaveInfo(values)}>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Thông Tin</div>
              </div>
              <Form.Item className="!mb-1.5" name="vietName" label="Tên Việt">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="chineseName" label="Tên Tiếng Trung">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="englishName" label="Tên Tiếng Anh">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="otherName" label="Tên Khác">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="alias" label="Bí Danh">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="age" label="Tuổi">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="gender" label="Giới Tính">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="pseudonym" label="Tên Giả">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="status" label="Tình Trạng">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="causeOfDeath" label="Nguyên Nhân Tử Vong">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="betrothed" label="Hôn Phu">
                <Input/>
              </Form.Item>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Thế Lực</div>
              </div>
              <Form.Item className="!mb-1.5" name="faction" label="Phe Phái">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="sect" label="Tông Môn">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="clan" label="Gia Tộc">
                <Input/>
              </Form.Item>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Nguồn gốc</div>
              </div>
              <Form.Item className="!mb-1.5" name="race" label="Chủng Tộc">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="bloodLine" label="Huyết Mạch">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="realm" label="Lãnh Thổ / Quốc Gia">
                <Input/>
              </Form.Item>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Sức mạnh</div>
              </div>
              <Form.Item className="!mb-1.5" name="cultivationRealm" label="Cảnh Giới Tu Luyện">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="bodyRealm" label="Cảnh Giới Thân Thể">
                <Input/>
              </Form.Item>

              <Form.Item className="!mb-1.5" name="combatPower" label="Sức Mạnh">
                <Input/>
              </Form.Item>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Khác</div>
              </div>
              <Form.Item className="!mb-1.5" name="firstAppearance" label="Xuất Hiện Lần Đầu">
                <Input/>
              </Form.Item>
            </Form>

          </div>
        </div>
      </Modal>
      <div className={'w-[220px]'}>
        <div className="flex justify-center  ">
          {/*<Input.OTP  className='fle'/>*/}
          <div className={'flex justify-center items-center w-full hover:bg-amber-300 p-2 rounded-2xl mb-1'} onClick={handleEdit}>
            <img src={`${IMAGE_URL}/edit-text.png`} className={'w-auto h-5'}/>
            <div className={'mb-0'}>Sửa thông tin</div>
          </div>
        </div>
        <div className={'border-1 border-purple-500-300'}>
          <div
            className={
              'text-center py-3 px-[9px] h-[2.5rem] bg-amber-200 font-bold'
            }
          >
            Character Name
          </div>
          <ClickableImageUpload/>
          <div className="w-full border  text-sm  -mt-1">
            {characterMeta.map((section, i) => {
              // Kiểm tra nếu tất cả các field trong section này đều không có giá trị
              const hasValidData = section.fields.some(({ key }) => character[key])

              // Nếu không có giá trị hợp lệ thì bỏ qua section này
              if (!hasValidData) return null

              return (
                <div key={i}>
                  <div className="bg-purple-900 text-white font-bold px-3 py-2">{section.section}</div>
                  {section.fields.map(({ key, label }, index) => {
                    const value = character[key]
                    if (!value) return null // Bỏ qua nếu không có dữ liệu
                    return (
                      <div
                        key={key}
                        className={`grid grid-cols-6 px-3 py-3 text-left border-b text-xs border-purple-200 last:border-b-0`}
                      >
                        <div className="col-span-2 font-bold ">{label}</div>
                        <div className="col-span-4 ml-3">{value}</div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
