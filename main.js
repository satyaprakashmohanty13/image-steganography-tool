// 🔁 Replace this with your actual backend URL:
const API_BASE = "https://your-worker-name.workers.dev";

async function uploadImage() {
  const imageInput = document.getElementById("imageInput");
  const message = document.getElementById("messageInput").value;

  if (!imageInput.files[0] || !message) {
    alert("Please select an image and enter a message.");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageInput.files[0]);
  formData.append("message", message);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData
  });

  const result = await res.json();
  document.getElementById("uploadResult").innerText = `✅ Your key is: ${result.key}`;
  document.getElementById("keyInput").value = result.key;
}

async function decodeMessage() {
  const key = document.getElementById("keyInput").value.trim();
  if (!key) {
    alert("Please enter a key");
    return;
  }

  // Get message
  const res = await fetch(`${API_BASE}/decode/${key}`);
  if (!res.ok) {
    alert("Invalid key or image not found");
    return;
  }

  const { message } = await res.json();
  document.getElementById("decodedText").textContent = message;

  // Load image
  const img = document.getElementById("decodedImage");
  img.src = `${API_BASE}/image/${key}`;

  document.getElementById("outputBox").style.display = "block";
}
