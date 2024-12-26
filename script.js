
// Store messages in localStorage to simulate synchronization
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Function to render messages
function renderMessages() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = ''; // Clear the chat window
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = msg.sender === localStorage.getItem('username') ? 'my-message' : 'friend-message';
        div.textContent = `${msg.sender}: ${msg.text}`;
        chatWindow.appendChild(div);
    });
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// On login, save username and redirect to chat
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username && password) {
                localStorage.setItem('username', username);
                window.location.href = 'chat.html';
            } else {
                alert('Please enter both username and password!');
            }
        });
    }

    // Chat page logic
    if (window.location.pathname.includes('chat.html')) {
        const loggedInUser = localStorage.getItem('username');
        if (!loggedInUser) {
            window.location.href = 'index.html';
            return;
        }

        renderMessages();

        const sendBtn = document.getElementById('send-btn');
        const messageInput = document.getElementById('message');

        sendBtn.addEventListener('click', () => {
            const messageText = messageInput.value.trim();
            if (messageText) {
                const message = { sender: loggedInUser, text: messageText };
                messages.push(message);
                localStorage.setItem('messages', JSON.stringify(messages));
                messageInput.value = '';
                renderMessages();
            }
        });

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });

        // Sync messages every second (simulate real-time updates)
        setInterval(() => {
            messages = JSON.parse(localStorage.getItem('messages')) || [];
            renderMessages();
        }, 1000);
    }
});

