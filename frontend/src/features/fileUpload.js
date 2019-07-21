import Papa from 'papaparse'

export const uploadFile = (file, complete, error) => {
  const config = {
    delimiter: '', // auto-detect
    newline: '', // auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    encoding: '',
    worker: false,
    comments: false,
    step: undefined,
    complete,
    error,
    download: false,
    downloadRequestHeaders: undefined,
    skipEmptyLines: 'greedy', // skip empty line
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined,
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
  }

  Papa.parse(file, config)
}
