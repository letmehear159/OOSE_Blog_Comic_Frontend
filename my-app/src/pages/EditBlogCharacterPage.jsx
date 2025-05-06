// import RichTextEditor from '../editor/RichTextEditor.jsx'
import { useContext, useState } from 'react'
import RichTextEditor from '../editor/RichTextEditor.jsx'
import { customImageAlignStyles } from '../editor/editorCustomStyleConstant.jsx'
import { EditCharacterInfo } from '../components/EditCharacterInfo.jsx'
import { Divider, Input, message } from 'antd'
import { AuthContext } from '../context/auth.context.jsx'
import { saveBlogCharacterService } from '../services/blogService.js'

const characterData = {
  vietName: ' ',
  chineseName: ' ',
  pseudonym: ' ',
  otherName: ' ',
  age: 10000,

  gender: ' ',
  faction: ' ',
  race: ' ',
  realm: ' ',
  cultivationRealm: ' ',
  bodyRealm: ' ',
  combatPower: ' ',
  alias: ' ',
  status: ' ',
  betrothed: ' ',
  sect: ' ',
  clan: ' ',
  bloodLine: ' ',

}
export const EditBlogCharacterPage = () => {
  const { user } = useContext(AuthContext)
  const { uploadCharacterAvatar, setUploadCharacterAvatar } = useContext(AuthContext)
  // user.id = 4
  // HTML content của bài viết
  const [result, setResult] = useState('')
  const [preview, setPreview] = useState('')
  const [isImageSaved, setIsImageSaved] = useState(false)
  // Thông tin nhân vật, tương ứng với CharacterReq trong BE
  const [character, setCharacter] = useState(characterData)
  // Tiêu đề
  const [blogTitle, setBlogTitle] = useState('')
  const saveBlog = async () => {

    const blogCharacterReq = {
      title: blogTitle,
      authorId: 4,
      content: result,
      character: character
    }
    try {
      const response = await saveBlogCharacterService(blogCharacterReq, uploadCharacterAvatar)
      message.success('Tạo bài viết thành công')
    } catch (error) {
      message.error(error.data)
    }

  }

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <div className="grid grid-cols-12 ">
        <div className={'col-span-8 mr-4 '}>
          <div className={'flex justify-start mb-1.5 h-[37px]'}>
            <Input value={blogTitle} placeHolder={'Nhập tiêu đề bài viết '} className={'!w-40 h-full'}
                   onChange={(e) => setBlogTitle(e.target.value)}/>
          </div>
          <RichTextEditor setResult={setResult} setPreview={setPreview} isImageSaved={isImageSaved}
                          setIsImageSaved={setIsImageSaved} saveBlog={saveBlog}/>
          <div className={'text-left mt-9'}>Bản xem trước</div>
          <Divider className={'!mt-0'}/>

          <div className={'border p-2'}>
            <div
              className="prose prose-lg max-w-none "
              dangerouslySetInnerHTML={{ __html: preview }}
            >
            </div>
          </div>
        </div>
        <div className={'col-span-2'}>
          <EditCharacterInfo character={character} setCharacter={setCharacter}/>
        </div>
      </div>
    </>
  )
}