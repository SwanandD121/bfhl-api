const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/api/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid input: data must be an array' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || [];

    const response = {
      is_success: true,
      user_id: "swanand_deshpande", // Replace with your actual user_id
      email: "swanand.deshpande2021@vitbhopal.ac.in", // Replace with your actual email
      roll_number: "21BCE11281", // Replace with your actual roll number
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, message: 'Internal server error' });
  }
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Add this: 404 handler for any other routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Export the Express app
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
module.exports = app;