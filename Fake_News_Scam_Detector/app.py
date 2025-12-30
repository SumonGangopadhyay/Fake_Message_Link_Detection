from flask import Flask, render_template, request, jsonify
import re
from datetime import datetime

app = Flask(__name__)

# Enhanced scam keywords with categories
scam_keywords = {
    'urgent': ['urgent', 'click', 'free', 'money', 'gift', 'lottery', 'won', 'prize', 'verify', 
               'verify immediately', 'kyc', 'otp', 'account blocked', 'investment opportunity', 
               'work from home', 'limited time', 'act now', 'congratulations', 'winner', 'claim', 
               'suspended', 'expired', 'confirm immediately', 'update required', 'act immediately'],
    'links': ['bit.ly', 'tinyurl', 'shortened', 'click here', 'click link', 'download now', 'install now'],
    'financial': ['bank account', 'credit card', 'debit card', 'payment details', 'transfer money', 
                  'wallet', 'upi', 'password', 'pin', 'cvv', 'account number', 'card number'],
    'threats': ['account blocked', 'account suspended', 'legal action', 'arrest', 'police', 'court', 
                'fine', 'penalty', 'locked', 'disabled', 'will be blocked', 'now', 'immediately']
}

# Suspicious patterns
suspicious_patterns = [
    r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',  # URLs
    r'\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}',  # Credit card patterns
    r'(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}',  # Domain names
    r'\b[A-Z]{2,}\b',  # Multiple uppercase words (common in scams)
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('message', '').lower()
    
    if not text:
        return jsonify({'error': 'No message provided'}), 400
    
    result = analyze_message(text)
    return jsonify(result)

def analyze_message(text):
    score = 0
    reasons = []
    category_scores = {
        'urgent': 0,
        'links': 0,
        'financial': 0,
        'threats': 0
    }
    
    # Check for scam keywords by category
    for category, keywords in scam_keywords.items():
        for word in keywords:
            if word in text:
                score += 2
                category_scores[category] += 1
                reasons.append(f"Suspicious keyword detected: '{word}'")
    
    # Check for suspicious patterns
    for pattern in suspicious_patterns:
        matches = re.findall(pattern, text)
        if matches:
            score += 3
            reasons.append(f"Suspicious pattern detected")
    
    # Check for "http" or "www" presence
    if "http" in text or "www" in text:
        score += 3
        reasons.append("Suspicious link detected")
    
    # Multiple exclamation marks or question marks
    if text.count('!') > 2 or text.count('?') > 2:
        score += 2
        reasons.append("Excessive punctuation (common in scams)")
    
    # Determine risk level
    if score >= 10:
        risk_level = "High Risk"
        risk_class = "high"
        recommendation = "⚠️ This message shows multiple signs of being a scam. Do not click any links or share personal information."
    elif score >= 5:
        risk_level = "Medium Risk"
        risk_class = "medium"
        recommendation = "⚡ This message contains suspicious elements. Exercise caution and verify the source."
    else:
        risk_level = "Low Risk"
        risk_class = "low"
        recommendation = "✓ This message appears relatively safe, but always remain vigilant."
    
    return {
        'risk_level': risk_level,
        'risk_class': risk_class,
        'score': min(score, 20),  # Cap at 20 for display
        'max_score': 20,
        'reasons': list(set(reasons))[:5],  # Remove duplicates and limit to 5
        'recommendation': recommendation,
        'category_scores': category_scores,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

if __name__ == '__main__':
    app.run(debug=True, port=5001)