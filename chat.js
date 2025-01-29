// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyDVj7gTYTFmZisNSKERMi4djxS1NP8pNnQ",
  authDomain: "line-chat-app-da626.firebaseapp.com",
  projectId: "line-chat-app-da626",
  storageBucket: "line-chat-app-da626.firebasestorage.app",
  messagingSenderId: "67227989811",
  appId: "1:67227989811:web:f8e499c0f5df06102ff046"
};

// Firebase初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// メッセージを送信
function sendMessage() {
    const messageInput = document.getElementById("messageInput").value;

    if (messageInput.trim() === "") return;

    db.collection("messages").add({
        sender: "user1",  // 仮のユーザーID
        receiver: "user2",  // 仮の受信者ID
        text: messageInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("messageInput").value = "";
}

// メッセージをリアルタイム表示
db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot(snapshot => {
    const messagesList = document.getElementById("messages");
    messagesList.innerHTML = "";

    snapshot.forEach(doc => {
        const message = doc.data();
        const li = document.createElement("li");
        li.textContent = `${message.sender}: ${message.text}`;
        messagesList.appendChild(li);
    });
});
