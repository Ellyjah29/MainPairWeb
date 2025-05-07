<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Septorch Pair Code</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #000000, #a20000);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }

    .card {
      background: #1c1c1c;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.3);
      width: 100%;
      max-width: 400px;
      text-align: center;
      animation: fadeIn 0.7s ease-in-out;
    }

    .card h3 {
      font-size: 1.5rem;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }

    .card h6 {
      font-size: 0.95rem;
      color: #ccc;
      margin-bottom: 1.5rem;
    }

    .input-container {
      display: flex;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 1.2rem;
      border: 2px solid #075e54;
      background: #000;
    }

    .input-container input {
      flex: 1;
      padding: 1rem;
      border: none;
      color: #fff;
      background: transparent;
      font-size: 1rem;
    }

    .input-container input::placeholder {
      color: #aaa;
    }

    .input-container input:focus {
      outline: none;
    }

    .input-container button {
      background: #25d366;
      border: none;
      padding: 0 1rem;
      color: white;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .input-container button:hover {
      background: #1ebd5a;
    }

    #loading-spinner {
      display: none;
      margin-top: 1rem;
    }

    .fa-spinner {
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    #pair {
      margin-top: 1.2rem;
      font-size: 1.1rem;
    }

    #copy {
      cursor: pointer;
      display: inline-block;
    }

    .channel-btn {
      margin-top: 1.5rem;
      display: inline-block;
      background: #075e54;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.3s ease;
    }

    .channel-btn:hover {
      background: #0d7e6c;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="card">
    <i class="fa fa-user-circle fa-3x" style="margin-bottom: 1rem; color: #25d366;"></i>
    <h3>Link Septorch with Phone Number</h3>
    <h6>🔢 Enter your number with country code to receive your pair code.</h6>

    <div class="input-container">
      <input type="number" id="number" placeholder="+234xxxxxxxxxx">
      <button id="submit">PAIR</button>
    </div>

    <div id="loading-spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </div>

    <main id="pair"></main>

    <a href="https://whatsapp.com/channel/0029Vb1ydGk8qIzkvps0nZ04" target="_blank" class="channel-btn">
      📢 Join Septorch Channel
    </a>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js"></script>
  <script>
    const pairOutput = document.getElementById("pair");
    const submitBtn = document.getElementById("submit");
    const numberInput = document.getElementById("number");

    async function Copy() {
      const text = document.getElementById("copy").innerText;
      const obj = document.getElementById("copy");
      await navigator.clipboard.writeText(obj.innerText.replace('CODE: ', ''));
      obj.innerText = "✔️ COPIED";
      obj.style.color = "lightgreen";
      setTimeout(() => {
        obj.innerText = text;
        obj.style.color = "blue";
      }, 600);
    }

    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const loading = document.getElementById("loading-spinner");
      const value = numberInput.value.trim();

      if (!value) {
        pairOutput.innerHTML = '<div style="color:red;">❗ Please enter your WhatsApp number.</div>';
        return;
      }

      const cleanNumber = value.replace(/[^0-9]/g, "");
      if (cleanNumber.length < 11) {
        pairOutput.innerHTML = '<div style="color:red;">❗ Invalid number format. Try again.</div>';
        return;
      }

      numberInput.type = "text";
      numberInput.value = "+" + cleanNumber;
      loading.style.display = "block";
      pairOutput.innerHTML = "";

      try {
        const { data } = await axios(`/code?number=${cleanNumber}`);
        const code = data.code || "❗ Service Unavailable";
        pairOutput.innerHTML = `<div id="copy" onclick="Copy()" style="color:blue;font-weight:bold;">CODE: <span style="color:white;">${code}</span></div>`;
      } catch (error) {
        pairOutput.innerHTML = '<div style="color:red;">❗ Error retrieving code.</div>';
      }

      loading.style.display = "none";
    });
  </script>
</body>
</html>
