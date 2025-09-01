window.addEventListener('load', () => {
    // Wait for splash to fade out, then show chat
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
    }, 2500); // Matches splash animation delay + duration
});

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    input.value = '';
    simulateBotResponse(message);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function simulateBotResponse(userMessage) {
    setTimeout(() => {
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(res => res.json())
        .then(data => {
            typeBotMessage(data.reply);
        });
    }, 500); // delay before starting typing
}

function typeBotMessage(text) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'bot');
    chatBox.appendChild(msgDiv);

    let i = 0;

    const thinkingDelay = 400;
    const minSpeed = 5;
    const maxSpeed = 15;

    function type() {
        if (i < text.length) {
            msgDiv.textContent += text.charAt(i);
            i++;

            chatBox.scrollTop = chatBox.scrollHeight;

            const randomDelay = minSpeed + Math.random() * (maxSpeed - minSpeed);
            setTimeout(type, randomDelay);
        } else {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    setTimeout(type, thinkingDelay);
}

document.addEventListener("DOMContentLoaded", function () {
 const micButton = document.getElementById("micButton");
 const userInput = document.getElementById("user-input");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    alert("Speech Recognition not supported in this browser.");
    return;
}

const recognition = new SpeechRecognition();
recognition.lang ='eng-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

micButton.addEventListener("click", () => {
    recognition.start();
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-spinner", "fa-spin")
});

recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript;
    userInput.value = speechText;
};

recognition.onend = function () {
    micIcon.classList.remove("fa-spinner", "fa-spin");
    micIcon.classList.add("fa-microphone");
};

recognition.onerror = function(event) {
    console.error("Speech recognition error:, event.error");
    micIcon.classList.remove("fa-spinner", "fa-spin");
    micIcon.classList.add("fa-microphone");
};
});

