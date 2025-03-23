// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Call the API exposed from preload.js
    const data = await window.api.fetchData()

    // Display the API response in the HTML page
    document.getElementById('output').innerText = JSON.stringify(data, null, 2)
  } catch (error) {
    document.getElementById('output').innerText = 'Error fetching data'
  }
})
