const backendURL = "https://<your-render-backend>.onrender.com";

async function encode() {
  const image = document.getElementById('encode-image').files[0];
  const message = document.getElementById('encode-message').value;
  if (!image || !message) return alert("Please select image and enter message");

  const formData = new FormData();
  formData.append("image", image);
  formData.append("message", message);

  const res = await fetch(`${backendURL}/encode`, {
    method: 'POST',
    body: formData
  });

  const blob = await res.blob();
  const imgUrl = URL.createObjectURL(blob);
  document.getElementById('encoded-result').src = imgUrl;
}

async function decode() {
  const image = document.getElementById('decode-image').files[0];
  if (!image) return alert("Please select an image");

  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch(`${backendURL}/decode`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  document.getElementById('decoded-message').innerText = data.message;
}
