export function setupCounter(counter) {
  let count = 0
  counter.textContent = `count is ${count}`
  counter.addEventListener('click', () => {
    count += 1
    counter.textContent = `count is ${count}`
  })
}
