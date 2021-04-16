const myWorker = new Worker('./worker.js')

myWorker.postMessage('hello worker, finish the work')
console.log('master posted message to worker')

myWorker.onmessage = msg => {
  console.log(`message received from worker: ${msg.data}`)
}

console.log('master is going home')
