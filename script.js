const otpDisplay = document.getElementById('otp-display');
const countdownElement = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');

const API_URL = 'https://totpbackend-b0ql.onrender.com/otp';

async function fetchOtp() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Format OTP like 123 456
        const otpStr = data.otp.toString().padStart(6, '0');
        otpDisplay.innerText = otpStr.slice(0, 3) + ' ' + otpStr.slice(3);

        const remainingSeconds = data.expires_in;

        countdownElement.innerText = `Refreshing in ${remainingSeconds}s`;

        const percentage = (remainingSeconds / 30) * 100;
        progressBar.style.width = `${percentage}%`;

        if (remainingSeconds <= 5) {
            progressBar.style.background = '#fe4f4f';
            otpDisplay.style.color = '#fe4f4f';
        } else {
            progressBar.style.background = '#4facfe';
            otpDisplay.style.color = '#4facfe';
        }

    } catch (error) {
        console.error("Error fetching OTP:", error);
        otpDisplay.innerText = "ERROR";
    }
}

// fetch every second
setInterval(fetchOtp, 1000);

// first load
fetchOtp();