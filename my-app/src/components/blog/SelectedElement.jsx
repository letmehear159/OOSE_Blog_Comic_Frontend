import { useEffect } from 'react'

const colorMap = {
  amber: {
    text: 'text-amber-500',
    bg: 'bg-amber-100',
    border: 'border-amber-600',
    hover: 'hover:bg-amber-200 hover:text-amber-600',
    delete: 'text-amber-500',
  },
  blue: {
    text: 'text-blue-600',
    bg: 'bg-blue-100',
    border: 'border-blue-600',
    hover: 'hover:bg-blue-200 hover:text-blue-700',
    delete: 'text-blue-500',
  }
}

export const SelectedElement = ({ selected, type, color }) => {
  const style = colorMap[color]
  useEffect(() => {

  }, [selected])
  return (
    <>
      <div className="flex flex-col items-center sm:flex-row  gap-4 my-2 max-w-4xl mx-auto ">
        {/* Nhãn Thể loại */}
        <div
          className="flex items-center justify-center text-sm font-medium text-gray-800 bg-gray-50 px-4 py-2 rounded-lg shadow-sm w-[100px] shrink-0">
          {type}
        </div>

        {/* Danh sách thể loại đã chọn */}
        <div className="flex flex-wrap items-center justify-start gap-3 w-full ">
          {selected === null || selected === undefined || selected.length === 0 ? (
            <div className="text-gray-500 italic text-sm flex items-center h-full">
              Chưa chọn {type}
            </div>
          ) : (
            selected.map((cat) => (
              <label
                key={cat.id}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border min-h-[28px] transition-all duration-200 cursor-pointer hover:shadow-sm ${style.border} ${style.bg} ${style.text} ${style.hover}`}
              >
                <span className="text-sm  font-medium leading-5">{cat.name}</span>
                <span
                  className={`${style.text} hover:text-red-500 flex items-center`}
                >
          </span>
              </label>
            ))
          )}
        </div>
      </div>

    </>
  )
}