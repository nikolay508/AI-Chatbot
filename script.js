const msgInput = document.querySelector('.msg-input');
const chatBody = document.querySelector('.bodyy');
const sendMsgBtn = document.querySelector('.chat-form .controls button');

const API_KEY = '';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

const userData = {
    message: null
}

const createMsgEl = (content, ...classes) => {
    const div = document.createElement('div');
    div.classList.add('message', ...classes);
    div.innerHTML = content;
    return div;
}

const generateBotResponse = async () => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            contents: [{
                parts: [{text: userData.message}]
            }]
        })
    }

    try{
        const resp = await fetch(API_URL, requestOptions);
        const data = await resp.json();
        if(!resp.ok) throw new Error(data.error.message);

        console.log(data);
    }catch(err){
        console.log(err);
    }
}

const handleMsg = (e) => {
    e.preventDefault;

    userData.message = msgInput.value.trim();
    msgInput.value = '';

    const content = `<div class="text"></div>`; 
    const outgoingMsgDiv = createMsgEl(content, 'user-msg');
    outgoingMsgDiv.querySelector('.text').textContent = userData.message;
    chatBody.append(outgoingMsgDiv);

    setTimeout(() => {
        const content = `<img id="chatbot-icon" src="./images/icon-ai.png" alt="">
                <div class="text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`; 

        const incomingMsgDiv = createMsgEl(content, 'bot-msg', 'thinking');
        chatBody.append(incomingMsgDiv);
    }, 600);
    generateBotResponse();
}

msgInput.addEventListener('keydown', (e) => {
    const userMsg = e.target.value.trim();
    if(e.key === 'Enter' && userMsg){
        handleMsg(e);
    }
})

sendMsgBtn.addEventListener('click', (e) => handleMsg(e));