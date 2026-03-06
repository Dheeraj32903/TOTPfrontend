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

        // Use backend timer instead of browser timer
        const remainingSeconds = data.expires_in;

        countdownElement.innerText = `Refreshing in ${remainingSeconds}s`;

        const percentage = (remainingSeconds / 30) * 100;
        progressBar.style.width = `${percentage}%`;

    } catch (error) {
        console.error('Error fetching OTP:', error);
        otpDisplay.innerText = 'ERROR';
    }
}

function updateTimer() {
    const epoch = Math.floor(Date.now() / 1000);
    const remainingSeconds = 30 - (epoch % 30);

    countdownElement.innerText = `Refreshing in ${remainingSeconds}s`;

    const percentage = (remainingSeconds / 30) * 100;
    progressBar.style.width = `${percentage}%`;

    // Change color when time is running low
    if (remainingSeconds <= 5) {
        progressBar.style.background = '#fe4f4f';
        otpDisplay.style.color = '#fe4f4f';
        otpDisplay.style.textShadow = '0 0 10px rgba(254, 79, 79, 0.5)';
    } else {
        progressBar.style.background = '#4facfe';
        otpDisplay.style.color = '#4facfe';
        otpDisplay.style.textShadow = '0 0 10px rgba(79, 172, 254, 0.5)';
    }

    // When exactly 30 or we just rolled over
    if (remainingSeconds === 30) {
        fetchOtp();
    }
}

// Initial fetch and start loop
fetchOtp();
updateTimer();

// As required: call the /otp endpoint every second and display the OTP
// And also refresh the countdown timer UI every second
setInterval(() => {
    updateTimer();
    fetchOtp();
}, 1000);
