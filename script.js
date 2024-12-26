// Redirect after login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            sessionStorage.setItem('username', username);
            window.location.href = 'chat.html';
        });
    }
    
    const chatWindow = document.getElementById('chat-window');
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message');
    const uploadBtn = document.getElementById('upload-btn');
    const fileUpload = document.getElementById('file-upload');

    if (sendBtn && chatWindow) {
        sendBtn.addEventListener('click', () => {
            const message = messageInput.value.trim();
            if (message) {
                const div = document.createElement('div');
                div.textContent = `${sessionStorage.getItem('username')}: ${message}`;
                chatWindow.appendChild(div);
                chatWindow.scrollTop = chatWindow.scrollHeight;
                messageInput.value = '';
            }
        });
    }

    uploadBtn.addEventListener('click', () => {
        fileUpload.click();
    });

    fileUpload.addEventListener('change', () => {
        const file = fileUpload.files[0];
        if (file) {
            const div = document.createElement('div');
            div.textContent = `${sessionStorage.getItem('username')} uploaded: ${file.name}`;
            chatWindow.appendChild(div);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    });
});

