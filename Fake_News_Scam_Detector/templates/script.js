// Global variables
let scansToday = 0;

// DOM Elements
const form = document.getElementById('analyzeForm');
const messageInput = document.getElementById('messageInput');
const clearBtn = document.getElementById('clearBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const loading = document.getElementById('loading');
const scansCounter = document.getElementById('scansToday');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadScansCount();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    form.addEventListener('submit', handleSubmit);
    clearBtn.addEventListener('click', clearForm);
    
    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (!message) {
        showNotification('Please enter a message to analyze', 'warning');
        return;
    }
    
    // Show loading state
    showLoading();
    
    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) {
            throw new Error('Analysis failed');
        }
        
        const result = await response.json();
        displayResults(result);
        
        // Update scan counter
        scansToday++;
        saveScansCount();
        updateScansDisplay();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('An error occurred during analysis. Please try again.', 'error');
        hideLoading();
    }
}

// Show loading state
function showLoading() {
    resultsSection.style.display = 'none';
    loading.style.display = 'block';
    analyzeBtn.disabled = true;
}

// Hide loading state
function hideLoading() {
    loading.style.display = 'none';
    analyzeBtn.disabled = false;
}

// Display results
function displayResults(result) {
    hideLoading();
    
    // Show results section with animation
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Update timestamp
    document.getElementById('timestamp').textContent = result.timestamp;
    
    // Update risk card
    const riskCard = document.getElementById('riskCard');
    const riskLevel = document.getElementById('riskLevel');
    const riskDescription = document.getElementById('riskDescription');
    const recommendation = document.getElementById('recommendation');
    
    // Remove existing classes
    riskCard.classList.remove('high', 'medium', 'low');
    riskCard.classList.add(result.risk_class);
    
    riskLevel.textContent = result.risk_level;
    riskDescription.textContent = `Security Score: ${result.score} / ${result.max_score}`;
    recommendation.textContent = result.recommendation;
    
    // Animate score circle
    animateScoreCircle(result.score, result.max_score);
    
    // Update category scores
    updateCategoryScores(result.category_scores);
    
    // Display reasons
    displayReasons(result.reasons);
    
    // Recommendation card styling
    const recommendationCard = document.getElementById('recommendationCard');
    recommendationCard.style.borderLeft = `4px solid ${getRiskColor(result.risk_class)}`;
}

// Animate score circle
function animateScoreCircle(score, maxScore) {
    const scoreValue = document.getElementById('scoreValue');
    const scoreCircle = document.getElementById('scoreCircle');
    
    const percentage = (score / maxScore) * 100;
    const circumference = 2 * Math.PI * 54; // r = 54
    const offset = circumference - (percentage / 100) * circumference;
    
    // Animate number
    animateValue(scoreValue, 0, score, 1000);
    
    // Animate circle
    setTimeout(() => {
        scoreCircle.style.strokeDashoffset = offset;
    }, 100);
}

// Animate number value
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Update category scores
function updateCategoryScores(scores) {
    const categories = ['urgent', 'links', 'financial', 'threats'];
    const maxCount = 5; // Maximum count for visualization
    
    categories.forEach(category => {
        const count = scores[category] || 0;
        const percentage = Math.min((count / maxCount) * 100, 100);
        
        const progressBar = document.getElementById(`${category}Progress`);
        const countElement = document.getElementById(`${category}Count`);
        
        // Animate progress bar
        setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
        }, 300);
        
        // Update count
        countElement.textContent = `${count} detected`;
    });
}

// Display reasons
function displayReasons(reasons) {
    const reasonsList = document.getElementById('reasonsList');
    reasonsList.innerHTML = '';
    
    if (reasons.length === 0) {
        reasonsList.innerHTML = '<div class="reason-item"><span class="reason-icon">✓</span><span class="reason-text">No significant threats detected</span></div>';
        return;
    }
    
    reasons.forEach((reason, index) => {
        const reasonItem = document.createElement('div');
        reasonItem.className = 'reason-item';
        reasonItem.style.animationDelay = `${index * 0.1}s`;
        
        reasonItem.innerHTML = `
            <span class="reason-icon">⚠️</span>
            <span class="reason-text">${reason}</span>
        `;
        
        reasonsList.appendChild(reasonItem);
    });
}

// Get risk color
function getRiskColor(riskClass) {
    const colors = {
        'high': '#ff3366',
        'medium': '#ffb800',
        'low': '#00ff88'
    };
    return colors[riskClass] || '#00f0ff';
}

// Clear form
function clearForm() {
    messageInput.value = '';
    messageInput.style.height = 'auto';
    resultsSection.style.display = 'none';
    messageInput.focus();
}

// Show notification (simple alert for now)
function showNotification(message, type) {
    alert(message);
}

// Scans counter functions
function loadScansCount() {
    const saved = localStorage.getItem('scansToday');
    const lastDate = localStorage.getItem('lastScanDate');
    const today = new Date().toDateString();
    
    if (lastDate === today && saved) {
        scansToday = parseInt(saved);
    } else {
        scansToday = 0;
        localStorage.setItem('lastScanDate', today);
    }
    
    updateScansDisplay();
}

function saveScansCount() {
    localStorage.setItem('scansToday', scansToday.toString());
}

function updateScansDisplay() {
    animateValue(scansCounter, parseInt(scansCounter.textContent) || 0, scansToday, 500);
}

// Add some interactivity to cards
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add parallax effect to background circles
    document.addEventListener('mousemove', function(e) {
        const circles = document.querySelectorAll('.circle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            circle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
    
    // Escape to clear
    if (e.key === 'Escape') {
        clearForm();
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});