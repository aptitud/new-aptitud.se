const imageLoader = (src, width, quality) => {
  return `http:${src}?w=${width}&q=${quality || 75}`
}

export default imageLoader
