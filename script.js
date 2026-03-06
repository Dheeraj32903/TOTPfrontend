const otpDisplay = document.getElementById('otp-display');
const countdownElement = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');

const API_URL = 'https://totpbackend-b0ql.onrender.com/otp';

let remainingSeconds = 30;

async function fetchOtp() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const otpStr = data.otp.toString().padStart(6, '0');
        otpDisplay.innerText = otpStr.slice(0, 3) + ' ' + otpStr.slice(3);

        remainingSeconds = data.expires_in;

    } catch (error) {
        console.error('Error fetching OTP:', error);
        otpDisplay.innerText = 'ERROR';
    }
}

function updateTimer() {

    countdownElement.innerText = `Refreshing in ${remainingSeconds}s`;

    const percentage = (remainingSeconds / 30) * 100;
    progressBar.style.width = `${percentage}%`;

    if (remainingSeconds <= 5) {
        progressBar.style.background = '#fe4f4f';
    } else {
        progressBar.style.background = '#4facfe';
    }

    remainingSeconds--;

    if (remainingSeconds <= 0) {
        fetchOtp();
    }
}

// Initial load
fetchOtp();

// Timer updates every second locally
setInterval(updateTimer, 1000);