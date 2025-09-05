# Cyber Hygiene Quiz

An interactive quiz application designed to test and improve your cybersecurity knowledge and best practices. The quiz features a collection of 50+ cybersecurity questions covering various topics such as password security, phishing, social engineering, and more.


## Features

- **Interactive Quiz Interface**: Clean, modern UI with responsive design
- **Dark/Light Theme Toggle**: Switch between cyberpunk dark and clean light themes
- **Randomized Questions**: Get 5 random questions from a pool of 50+ cybersecurity questions
- **Immediate Feedback**: See correct/incorrect answers with explanations
- **Score Tracking**: Get your score at the end of the quiz with visual feedback
- **Personalized Tips**: Receive customized feedback based on your performance
- **Mobile-Friendly**: Works on both desktop and mobile devices
- **Persistent Settings**: Your theme preference is saved between sessions

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser

## How to Use

1. Use the theme toggle button (🌓/☀️) in the top-right corner to switch between dark and light themes
2. Click the "Start Quiz" button to begin
3. Read each question carefully and select your answer
4. Click "Next Question" to proceed
5. After answering all questions, view your score and personalized feedback
6. Click "Take Quiz Again" to try a new set of random questions

### Theme Options
- **Dark Theme**: Cyberpunk-inspired dark interface with neon accents
- **Light Theme**: Clean, accessible light interface with high contrast

## File Structure

```
cyber-hygiene-quiz/
├── index.html      # Main HTML file
├── style.css       # Styles for the quiz interface with theme support
├── quiz.js         # Quiz logic, functionality, and theme switching
├── questions.json  # Database of 50+ cybersecurity questions
└── README.md       # Project documentation
```

## Questions

The quiz includes questions on various cybersecurity topics, including:
- Password security
- Phishing awareness
- Social engineering
- Network security
- Mobile security
- Data protection
- And more...

## Contributing

We welcome contributions to improve this quiz! Here's how you can help:

### Adding Questions
1. Add new questions to `questions.json` following this format:
   ```json
   {
     "question": "Your question here?",
     "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
     "answer": "Correct Answer"
   }
   ```
2. Ensure questions are clear, relevant to cybersecurity, and have one clearly correct answer

### Code Improvements
- Improve accessibility
- Add animations or transitions
- Enhance mobile responsiveness
- Optimize performance

### How to Contribute
1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate documentation.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Questions are based on common cybersecurity best practices
- Inspired by various cybersecurity awareness training programs
- Built with vanilla HTML, CSS, and JavaScript
- Special thanks to all contributors who help improve this project
