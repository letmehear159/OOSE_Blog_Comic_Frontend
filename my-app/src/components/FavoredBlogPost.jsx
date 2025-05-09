function FavoredBlogPost({ title, excerpt, isLast }) {
  return (
    <div className={`
      p-4
      ${!isLast ? 'border-b border-gray-200' : ''}
    `}>
      <h3 className="
        text-lg font-bold text-gray-800
        hover:text-blue-600 hover:underline
        transition-colors duration-200
        cursor-pointer
      ">
        {title}
      </h3>
      <p className="
        mt-2 text-sm text-gray-600
        line-clamp-2
      ">
        {excerpt}
      </p>
    </div>
  );
}

export default FavoredBlogPost; 