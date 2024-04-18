const Link = ({ href, children }) => {
  return <a className='flex items-center gap-4' href={href}>{children}</a>
}

export default Link;
