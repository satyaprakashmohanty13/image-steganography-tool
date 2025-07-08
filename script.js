const BACKEND_URL = 'https://<YOUR-HF-USERNAME>-<SPACE-NAME>.hf.space';

document.getElementById('encode-btn').onclick = async () => {
  const fileInput = document.getElementById('encode-file');
  const message = document.getElementById('message').value;
  const password = document.getElementById('password').value;
  const loader = document.getElementById('loader-encode');
  if (!fileInput.files.length || !message || !password) return alert('Fill all fields');
  const form = new FormData();
  form.append('file', fileInput.files[0]);
  form.append('message', message);
  form.append('password', password);
  loader.style.display = 'inline-block';
  try {
    const res = await fetch(BACKEND_URL + '/encode', { method: 'POST', body: form });
    if (!res.ok) throw new Error('Encode failed');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.getElementById('download-link');
    link.href = url; link.download = 'stego.png';
    link.style.display = 'block'; link.textContent = 'Download Stego Image';
  } catch (err) {
    alert(err.message);
  } finally {
    loader.style.display = 'none';
  }
};

document.getElementById('decode-btn').onclick = async () => {
  const fileInput = document.getElementById('decode-file');
  const password = document.getElementById('decode-password').value;
  const loader = document.getElementById('loader-decode');
  if (!fileInput.files.length || !password) return alert('Select image and password');
  const form = new FormData();
  form.append('file', fileInput.files[0]);
  form.append('password', password);
  loader.style.display = 'inline-block';
  try {
    const res = await fetch(BACKEND_URL + '/decode', { method: 'POST', body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Decode failed');
    document.getElementById('decoded-message').textContent = data.message;
  } catch (err) {
    alert(err.message);
  } finally {
    loader.style.display = 'none';
  }
};