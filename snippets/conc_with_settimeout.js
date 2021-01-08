const someSlowFun = n => {
  for (const i of Array(n).keys()) {
    for (const j of Array(n).keys()) {
      for (const k of Array(n).keys()) {
        const junk = n * n * n * n * n * n * n * n
      }
    }
  }
}

const test1 = () => console.log('test1')
const test2 = () => console.log('test2')
const test3 = () => {
  setTimeout(() => {
    someSlowFun(1000)
    console.log('some slow function complete')
  }, 0)
  console.log('test3')
}
const test4 = () => console.log('test4')
const test5 = () => console.log('test5')

test1()
test2()
test3()
test4()
test5()
