import { listCensorWord } from "../constants/list-censor-word"

export default function censorWordMessage(message: string) {
  const censorMessage = (prevMessage: string, censorWord: string) => {
    const asterisks = "*".repeat(censorWord.length)
    return prevMessage.replaceAll(censorWord, asterisks)
  }

  let censoredMessage = message
  listCensorWord.forEach((censorWord) => {
    censoredMessage = censorMessage(censoredMessage, censorWord)
  })

  return censoredMessage
}
