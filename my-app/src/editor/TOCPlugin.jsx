import { ButtonView } from 'ckeditor5'
import { Plugin } from 'ckeditor5'

export default class TOCPlugin extends Plugin {
  static get pluginName () {
    return 'TOCPlugin'
  }

  init () {
    const editor = this.editor

    editor.ui.componentFactory.add('insertTOC', (locale) => {
      const view = new ButtonView(locale)

      view.set({
        label: 'Chèn Mục Lục',
        tooltip: true,
        withText: true,
      })
      view.on('execute', () => {
        const html = editor.getData()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

        const tocList = document.createElement('ul')
        tocList.style.listStyleType = 'none'
        tocList.style.padding = '10px 0'

        const oldTOC = doc.querySelector('.auto-toc')
        if (oldTOC) oldTOC.remove()

        let counters = [0, 0, 0, 0, 0, 0] // Đếm số thứ tự cho từng cấp độ
        headings.forEach((heading, index) => {
          const level = parseInt(heading.tagName[1]) // Cấp độ của heading
          counters[level - 1]++ // Tăng số đếm cho cấp độ đó

          // Reset số thứ tự cho các cấp độ con
          for (let i = level; i < counters.length; i++) {
            counters[i] = 0
          }

          // Tạo số thứ tự, bỏ số 0 đứng trước
          const numbering = counters.slice(0, level).filter(n => n > 0).join('.')
          const id = `toc-heading-${index}`
          heading.id = id

          // Tạo mục lục
          const listItem = document.createElement('li')

          // Thêm indent (thụt lề) dựa trên cấp độ
          listItem.style.marginLeft = `${(level - 1) * 20}px` // Thụt lề 20px cho mỗi cấp độ

          const link = document.createElement('a')
          link.href = `#${id}`
          link.textContent = `${numbering} ${heading.textContent}`

          listItem.appendChild(link)
          tocList.appendChild(listItem)
        })

        // Chèn mục lục vào vị trí đầu bài viết
        const tocWrapper = document.createElement('div')
        tocWrapper.className = 'auto-toc'

        // Chèn icon vào trước tiêu đề "Mục lục"
        const titleWrapper = document.createElement('h3')
        titleWrapper.style.display = 'flex'
        titleWrapper.style.alignItems = 'center'

        // Chèn icon FontAwesome vào
        const icon = document.createElement('span')
        icon.style.marginRight = '8px'
        icon.style.marginTop = '3px'
        icon.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 384 512">
    <path fill="#333" d="M336 0H48C21.5 0 0 21.5 0 48v464l192-112 192 112V48c0-26.5-21.5-48-48-48z"/>
  </svg>
`
        // Sử dụng Font Awesome icon

        titleWrapper.appendChild(icon)

        // Chèn tiêu đề "Mục lục"
        const titleText = document.createElement('span')
        titleText.textContent = 'Mục lục'
        titleWrapper.appendChild(titleText)
        tocWrapper.appendChild(titleWrapper)

        tocWrapper.appendChild(tocList)
        tocWrapper.setAttribute('style', 'background:#f9f9f9;padding:10px;border:1px solid #ddd;margin-bottom:20px')

        // Cập nhật nội dung
        const newContent = tocWrapper.outerHTML + doc.body.innerHTML
        editor.setData(newContent)
      })

      return view
    })
  }
}
