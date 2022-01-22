export const LETTER_STATUS = {
  ABSENT: 'absent',
  PRESENT: 'present',
  CORRECT: 'correct'
}

export const TOASTER_MESSAGES = {
  NOT_ENOUGH_LETTERS: 'Not enough letters',
  NOT_IN_WORD_LIST: 'Not in word list',
  SUCCESS: ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"]
}

export const COLOR_VALUES = {
  light: {
    bg: '#ffffff',
    emptyTileBorder: '#d3d6da',
    nonEmptyTileBorder: '#878a8c',
    absent: '#787c7e',
    present: '#c9b458',
    correct: '#6aaa64',
    evaluatedText: '#ffffff',
    nonEvaluatedText: '#1a1a1b',
  },
  dark: {
    bg: '#121213',
    emptyTileBorder: '#3a3a3c',
    nonEmptyTileBorder: '#565758',
    absent: '#3a3a3c',
    present: '#b59f3b',
    correct: '#538d4e',
    evaluatedText: '#d7dadc',
    nonEvaluatedText: '#d7dadc'
  }
}