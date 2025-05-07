// import RichTextEditor from '../editor/RichTextEditor.jsx'
import { useContext, useState } from 'react'
import RichTextEditor from '../editor/RichTextEditor.jsx'
import { customImageAlignStyles } from '../editor/editorCustomStyleConstant.jsx'
import { EditCharacterInfo } from '../components/EditCharacterInfo.jsx'
import { Divider, Image, Input, message } from 'antd'
import { AuthContext } from '../context/auth.context.jsx'
import { saveBlogCharacterService } from '../services/blogService.js'
import { URL_BACKEND_IMAGES } from '../api/userApi.js'

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

const blogFake = [
  {
    'id': 11,
    'title': 'Tiên Nghịch - Hành trình của Vương Lâm',
    'summary': 'Khám phá hành trình tu tiên của Vương Lâm trong thế giới đầy cạm bẫy.',
    'content': '<p>Vương Lâm là một người phàm bình thường, nhưng có cơ duyên bất ngờ...</p>',
    'thumbnail': '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp',
    'createdAt': '2024-01-01T08:00:00Z'
  },
  {
    'id': 2,
    'title': 'Nhất Niệm Vĩnh Hằng - Bí ẩn của Thất Thái',
    'summary': 'Bạch Tiểu Thuần và hành trình phá vỡ giới hạn sinh tử.',
    'content': '<p>Với tính cách hài hước, Bạch Tiểu Thuần đã làm thay đổi cả giới tu tiên...</p>',
    'thumbnail': '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp',
    'createdAt': '2024-02-10T10:30:00Z'
  },
  {
    'id': 3,
    'title': 'Ma Thiên Ký - Ma Đạo và Chính Đạo',
    'summary': 'Tiêu Thần và cuộc chiến giữa thiện và ác trong giới tu đạo.',
    'content': '<p>Không cam chịu số phận, Tiêu Thần đã bước vào ma đạo để tìm lại công lý...</p>',
    'thumbnail': '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp',
    'createdAt': '2024-03-15T14:20:00Z'
  },
  {
    'id': 4,
    'title': 'Phàm Nhân Tu Tiên - Sự thật sau thế giới tu luyện',
    'summary': 'Hàn Lập và con đường tu tiên không có thiên phú.',
    'content': '<p>Không có thiên phú nhưng có nghị lực phi thường, Hàn Lập từng bước vươn lên...</p>',
    'thumbnail': '986947d2-e34c-42c9-8066-1bba9ae07500_thacsam.webp',
    'createdAt': '2024-04-05T12:00:00Z'
  }
]

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
  const [blogs, setBlogs] = useState(blogFake)
  const [search, setSearch] = useState('')
  const [blogComic, setBlogComic] = useState(null)
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )

  const saveBlog = async () => {

    const blogCharacterReq = {
      title: blogTitle,
      authorId: 4,
      content: result,
      character: character,
      comicId: blogComic === null ? null : blogComic.id,

    }
    try {
      const response = await saveBlogCharacterService(blogCharacterReq, uploadCharacterAvatar)
      message.success('Tạo bài viết thành công')
    } catch (error) {
      message.error(error.data)
    }
  }

  const handleChooseBlog = (blogComic) => {
    setBlogComic(blogComic)
  }

  return (

    <>
      <style>{customImageAlignStyles}</style>
      <div className="grid grid-cols-12 ">
        <div className={'col-span-8 mr-4 '}>
          <div className={'text-left'}>Nhân vật này thuộc truyện:</div>
          <div className={' flex '}>
            <Input.Search
              placeholder="Tìm blog theo tiêu đề"
              allowClear
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 400, marginBottom: '1rem', borderRadius: 0 }}
              className="!rounded-none"
            />
          </div>
          <div className={'border border-t-0 -mt-5   p-4 text-left w-[400px] overflow-y-scroll h-[200px] mb-10'}>
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className=" hover:bg-amber-200 my-2 cursor-pointer flex justify-start"
                   onClick={() => handleChooseBlog(blog)}>
                <div className={' !w-[100px] !h-auto mr-5 flex-shrink-0'}>
                  <Image
                    src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                    className="!h-auth !w-auto !object-cover"
                  />
                </div>
                <h3 className="font-bold">{blog.title}</h3>
              </div>
            ))}
          </div>

          <div className={'flex justify-start items-center  mb-1.5 h-[37px]'}>
            <Input value={blogTitle} placeHolder={'Nhập tiêu đề bài viết '} className={'!w-40 h-full'}
                   onChange={(e) => setBlogTitle(e.target.value)}/>
            <div className={'ml-10 font-bold'}>Thuộc truyện: {blogComic === null ? '' : blogComic.title}</div>
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