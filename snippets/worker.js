onmessage = msg => {
  console.log(`message received from master: ${msg.data}`)
  setTimeout(() => {
    postMessage('finished some heavy processing')
  }, 3000)
}
