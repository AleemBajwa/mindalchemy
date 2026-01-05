// Screen Navigation
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    const screen = document.getElementById(screenId + '-screen');
    if (screen) {
        screen.classList.add('active');
    }
    
    // Update bottom nav active state
    updateBottomNav(screenId);
}

function updateBottomNav(activeScreen) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const navItem = document.querySelector(`.nav-item[onclick="showScreen('${activeScreen}')"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
}

// Onboarding
let currentStep = 1;
const totalSteps = 3;

function nextOnboardingStep() {
    const currentStepEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
    currentStepEl.classList.remove('active');
    
    currentStep++;
    
    if (currentStep > totalSteps) {
        showScreen('register');
        return;
    }
    
    const nextStepEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
    nextStepEl.classList.add('active');
    
    // Update progress bar
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('onboarding-progress').style.width = progress + '%';
}

function selectOption(element) {
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
}

function selectMood(element, mood) {
    document.querySelectorAll('.mood-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
}

function selectMoodDetailed(element) {
    document.querySelectorAll('.mood-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Show mood details form
    document.getElementById('mood-details').style.display = 'block';
    document.getElementById('mood-details').scrollIntoView({ behavior: 'smooth' });
}

function logQuickMood(mood) {
    // Simulate mood logging
    showNotification('Mood logged successfully! 😊');
    // In real app, this would send to API
}

function saveMood() {
    showNotification('Mood saved! 📊');
    setTimeout(() => {
        showScreen('dashboard');
    }, 1000);
}

// Chat
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI typing
    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            // Simulate AI response
            const responses = [
                "I understand how you're feeling. Can you tell me more about what's causing this?",
                "That sounds really challenging. Let's work through this together. What do you think might help?",
                "Thank you for sharing that with me. Your feelings are valid. Would you like to try a breathing exercise?",
                "I'm here to support you. Let's explore some coping strategies that might help."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addChatMessage(randomResponse, 'ai');
        }, 1500);
    }, 500);
}

function addChatMessage(text, type) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const now = new Date();
    const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (type === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message ai-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="message-text typing-dots">
                <span>.</span><span>.</span><span>.</span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Allow Enter key to send message
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Crisis Detection
function detectCrisis(message) {
    const crisisKeywords = [
        'suicide', 'kill myself', 'end my life', 'hurt myself',
        'want to die', 'no point living', 'self harm'
    ];
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
}

function showCrisisModal() {
    document.getElementById('crisis-modal').classList.add('active');
}

function closeCrisisModal() {
    document.getElementById('crisis-modal').classList.remove('active');
}

// Notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .typing-dots {
        display: inline-flex;
        gap: 4px;
    }
    
    .typing-dots span {
        animation: typing 1.4s infinite;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            opacity: 0.3;
        }
        30% {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize - show welcome screen
document.addEventListener('DOMContentLoaded', () => {
    showScreen('welcome');
});

