document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('chatbot-toggle').addEventListener('click', function() {
        var chatbot = document.getElementById('chatbot');
        if (chatbot.style.display === 'none' || chatbot.style.display === '') {
            chatbot.style.display = 'block';
        } else {
            chatbot.style.display = 'none';
        }
    });

    // localStorage에서 채팅 상태 로드
    var chatState = localStorage.getItem('chat_state');
    var chatStateChatbot = localStorage.getItem('chat_state_chatbot');
    if (chatState && chatStateChatbot) {
        window.state = JSON.parse(chatState);
        window.state_chatbot = JSON.parse(chatStateChatbot);
        updateChatUI(window.state_chatbot);
    } else {
        window.state = [{
            'role': 'system',
            'content': 'You are a helpful assistant.'
        }];
        window.state_chatbot = [];
    }
});

function saveState() {
    localStorage.setItem('chat_state', JSON.stringify(window.state));
    localStorage.setItem('chat_state_chatbot', JSON.stringify(window.state_chatbot));
}

function updateChatUI(state_chatbot) {
    // 이 함수를 구현하여 state_chatbot을 기반으로 채팅 UI를 업데이트
    // 예: 채팅 내용을 채팅창에 추가하는 코드
}
