const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result");
const openLinkBtn = document.getElementById("openLink");
const ctx = canvas.getContext("2d");

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;
        scanQRCode();
    } catch (error) {
        console.error("Error accessing camera:", error);
        resultText.textContent = "Camera access denied.";
    }
}

function scanQRCode() {
    const scanInterval = setInterval(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
            clearInterval(scanInterval);
            resultText.textContent = `Scanned: ${code.data}`;
            if (code.data.startsWith("http")) {
                openLinkBtn.hidden = false;
                openLinkBtn.onclick = () => window.open(code.data, "_blank");
            }
        }
    }, 500);
}

startCamera();
