const sanitizeFileName = (value = 'pagenie') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'pagenie'

export const downloadFile = ({ content, filename, type }) => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.click()

  URL.revokeObjectURL(url)
}

export const buildExportFileName = (productName, suffix, extension) =>
  `${sanitizeFileName(productName)}-${suffix}.${extension}`
