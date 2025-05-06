import { CharacterInfo } from '../components/CharacterInfo.jsx'
// import RichTextEditor from '../editor/RichTextEditor.jsx'
import { useState } from 'react'
import RichTextEditor from '../editor/RichTextEditor.jsx'
import { customImageAlignStyles, customBlockQuoteStyles } from '../editor/editorCustomStyleConstant.jsx'
import { EditCharacterInfo } from '../components/EditCharacterInfo.jsx'
import { Divider } from 'antd'

const characterData = {
  vietName: ' ',
  chineseName: ' ',
  otherName: ' ',
  age: 0,
  gender: ' ',
  faction: ' ',
  race: ' ',
  realm: ' ',
  cultivationRealm: ' ',
  bodyRealm: ' ',
  combatPower: ' ',
}
export const EditBlogCharacterPage = () => {
  const [result, setResult] = useState('')
  const [preview, setPreview] = useState('')
  const [isImageSaved, setIsImageSaved] = useState(false)
  const [character, setCharacter] = useState(characterData)

  const saveBlog = () => {
    console.log('>>> Result ', result)
    console.log('>>> Character ', character)
  }

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <div className="grid grid-cols-12 ">
        <div className={'col-span-8 mr-4 mt-9'}>
          <RichTextEditor setResult={setResult} setPreview={setPreview} isImageSaved={isImageSaved}
                          setIsImageSaved={setIsImageSaved} saveBlog={saveBlog}/>
          <div className={'text-left mt-9'}>Bản xem trước</div>
          <Divider className={'!mt-0'}/>

          <div
            className="prose prose-lg max-w-none "
            dangerouslySetInnerHTML={{ __html: preview }}
          >
          </div>
        </div>
        <div className={'col-span-2'}>
          <EditCharacterInfo character={character} setCharacter={setCharacter} />
        </div>
      </div>
    </>
  )
}