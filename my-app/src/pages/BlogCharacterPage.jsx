import { CharacterInfo } from '../components/CharacterInfo.jsx'
import RichTextEditor from '../editor/RichTextEditor.jsx'
import { useState } from 'react'

export const BlogCharacterPage = () => {

  const [content, setContent] = useState('<p>Viết bài ở đây...</p>');
  return (
    <>
      <div className="grid grid-cols-12">
        <div className={'col-span-6'}>
        <RichTextEditor value={content} onChange={setContent}/>
        </div>
        <div className={'col-span-6'}>
          <CharacterInfo/>

        </div>
      </div>
    </>
  )
}