document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    document.getElementById('output').innerText = JSON.stringify(data, null, 2)
  } catch (error) {
    console.error('Fetch error:', error)
    document.getElementById('output').innerText = `Error fetching data: ${error.message}`
  }
})
