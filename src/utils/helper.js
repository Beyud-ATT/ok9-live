import cryptoJs from "crypto-js";

function generateSignature(data) {
  const { username, displayName, phone, email, password } = data;
  const KEY = import.meta.env.VITE_HASHING_TOKEN;

  const inputString = `username_${username}&displayName_${displayName}&phone_${phone}&email_${email}&password_${password}`;

  const firstHash = cryptoJs
    .MD5(cryptoJs.enc.Utf8.parse(inputString))
    .toString();

  const signatureInput = `data_${firstHash}&key_${KEY}`;

  const signature = cryptoJs
    .MD5(cryptoJs.enc.Utf8.parse(signatureInput))
    .toString();

  return signature;
}

function logoutHelper() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("displayName");
  localStorage.removeItem("userType");
}

const extractStreamUrls = (m3u8Content) => {
  if (!m3u8Content) return;

  const lines = m3u8Content.split("\n");
  const streamUrls = [];

  for (let i = 0; i < lines.length; i++) {
    // Look for lines that start with https:// (the actual stream URLs)
    if (lines[i].startsWith("https://")) {
      // Get the preceding line to find the bandwidth
      const infoline = lines[i - 1];
      const bandwidthMatch = infoline.match(/BANDWIDTH=(\d+)/);
      const resolutionMatch = infoline.match(/RESOLUTION=(\d+x\d+)/);

      if (bandwidthMatch && resolutionMatch) {
        streamUrls.push({
          bandwidth: parseInt(bandwidthMatch[1]),
          resolution: resolutionMatch[1],
          url: lines[i],
        });
      }
    }
  }

  return streamUrls.sort((a, b) => b.bandwidth - a.bandwidth);
};

export { generateSignature, logoutHelper, extractStreamUrls };
