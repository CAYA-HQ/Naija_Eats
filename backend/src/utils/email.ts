import emailjs from "@emailjs/nodejs";

const SERVICE_ID = "service_t4xoffb";
const TEMPLATE_ID_RESET = "template_ysohwva";
const TEMPLATE_ID_VERIFY = "template_867634j";

let inited = false;
function initEmailJS() {
  if (inited) return;
  emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY!,
    privateKey: process.env.EMAILJS_PRIVATE_KEY!,
  });
  inited = true;
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
  const verificationUrl = `${backendUrl}/auth/verify-email/${token}`;

  try {
    initEmailJS();
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_VERIFY,
      {
        email,
        url: verificationUrl,
        from_name: "Naija Eats",
      },
    );

    return { success: true, data: response };
  } catch (err) {
    console.error("Exception sending verification email:", err);
    return { success: false, error: err };
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

  try {
    initEmailJS();
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_RESET,
      {
        email,
        url: resetUrl,
        from_name: "Naija Eats",
      },
    );

    return { success: true, data: response };
  } catch (err) {
    console.error("Exception sending password reset email:", err);
    return { success: false, error: err };
  }
};
