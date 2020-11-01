var el = document.getElementById('input-file')
var text = document.getElementById('anagram-text')

if (el) {
  el.addEventListener('change', getFile)
}
function getFile(event) {
  const input = event.target
  if ('files' in input && input.files.length > 0) {
    placeFileContent(document.getElementById('content-target'), input.files[0])
  }
}

function placeFileContent(target, file) {
  readFileContent(file)
    .then((content) => {
      let words = []
      var lines = content.split('\n')
      var totalSize = lines.length
      var textInput = text.value
      let compareValue = textInput.split('').sort().join('')
      for (let index = 0; index < totalSize; index++) {
        let word = lines[index]
        let sortedWord = word.split('').sort().join('')
        if (sortedWord == compareValue) {
          words.push(word)
        }
      }
      words = words.join('\n')
      target.value = words
    })
    .catch((error) => console.log(error))
}

function readFileContent(file) {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result)
    reader.onerror = (error) => reject(error)
    reader.readAsText(file)
  })
}
