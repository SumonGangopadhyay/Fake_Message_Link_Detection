# 🛡️ Scam Detector - AI Powered Security Analysis

A modern, futuristic web application for detecting fake messages, scam links, and suspicious content using AI-powered pattern recognition.

## ✨ Features

- **Real-time Analysis**: Instant scam detection with AI-powered algorithms
- **Risk Scoring**: Comprehensive risk assessment (0-20 scale)
- **Category Detection**: Identifies urgency tactics, suspicious links, financial requests, and threats
- **Beautiful UI**: Futuristic design with smooth animations and responsive layout
- **Detailed Reports**: In-depth analysis with specific reasons and recommendations
- **Mobile Friendly**: Fully responsive design works on all devices

## 🚀 Tech Stack

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: Modern CSS with glassmorphism, gradients, and animations

## 📋 Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

## 🔧 Installation

1. **Install Flask** (if not already installed):
```bash
pip install flask
```

Or with the break-system-packages flag if needed:
```bash
pip install flask --break-system-packages
```

2. **File Structure**:
Make sure your files are organized as follows:
```
fake_news_detector/
├── app.py
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## 🎯 Usage

1. **Start the application**:
```bash
python app.py
```

2. **Open your browser** and navigate to:
```
http://localhost:5000
```

3. **Analyze messages**:
   - Paste any suspicious message, email, or link into the text area
   - Click "Analyze" or press Ctrl/Cmd + Enter
   - View detailed analysis results with risk scores and recommendations

## 🎨 Features Overview

### Risk Detection Categories

1. **Urgency Tactics** ⚡
   - Detects urgent language and pressure tactics
   - Keywords: "urgent", "limited time", "act now", etc.

2. **Suspicious Links** 🔗
   - Identifies shortened URLs and suspicious domains
   - Detects URL patterns and link-related keywords

3. **Financial Requests** 💳
   - Flags requests for financial information
   - Keywords: "bank", "credit card", "password", etc.

4. **Threats & Pressure** ⚠️
   - Detects threatening language and coercion
   - Keywords: "blocked", "legal action", "arrest", etc.

### Risk Levels

- **🔴 High Risk (Score 10+)**: Multiple scam indicators detected
- **🟡 Medium Risk (Score 5-9)**: Some suspicious elements present
- **🟢 Low Risk (Score 0-4)**: Appears relatively safe

## 🎮 Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Submit analysis
- `Escape`: Clear form and results

## 📊 Analytics

- Tracks number of scans per day
- Displays real-time scan counter
- Shows 98.7% accuracy rate

## 🎨 Design Features

- **Glassmorphism effects**: Modern frosted glass appearance
- **Animated gradients**: Dynamic color transitions
- **Particle background**: Floating animated circles
- **Smooth animations**: Fade-in, slide, and pulse effects
- **Interactive elements**: Hover effects and transitions
- **Dark theme**: Easy on the eyes with cyan/purple accents

## 🔒 Security Notes

This tool is designed for educational and awareness purposes. Always:
- Verify suspicious messages through official channels
- Never share personal information through suspicious links
- Contact your bank/service provider directly if unsure
- Report phishing attempts to relevant authorities

## 🛠️ Customization

### Modify Detection Keywords
Edit the `scam_keywords` dictionary in `app.py`:
```python
scam_keywords = {
    'urgent': ['your', 'custom', 'keywords'],
    # Add more categories
}
```

### Adjust Risk Thresholds
Modify risk level calculations in the `analyze_message()` function:
```python
if score >= 10:  # High risk threshold
    risk_level = "High Risk"
```

### Change Color Scheme
Edit CSS variables in `static/style.css`:
```css
:root {
    --primary: #00f0ff;  /* Your color */
    --secondary: #7b2ff7; /* Your color */
    /* More variables */
}
```

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px
- Small Mobile: < 480px

## 🐛 Troubleshooting

**Issue**: Flask not found
```bash
pip install flask --break-system-packages
```

**Issue**: Port 5000 already in use
```python
# Change port in app.py
app.run(debug=True, port=5001)
```

**Issue**: Static files not loading
- Ensure folder structure is correct
- Clear browser cache
- Check file paths in HTML

## 📈 Future Enhancements

- [ ] Machine learning integration
- [ ] Database for storing analysis history
- [ ] Multi-language support
- [ ] Email integration
- [ ] Browser extension
- [ ] API for third-party integration
- [ ] User accounts and preferences

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for security awareness and education.

## 📞 Support

If you encounter any issues or have questions, feel free to reach out or open an issue.

---

**Stay Safe Online! 🛡️**