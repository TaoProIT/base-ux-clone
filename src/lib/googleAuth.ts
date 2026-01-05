declare global {
  interface Window {
    google?: any;
  }
}

const GOOGLE_SCRIPT_ID = "google-identity-services";

export const loadGoogleScript = (): Promise<void> => {
  if (typeof window === "undefined") return Promise.resolve();
  const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);
  if (existingScript) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = GOOGLE_SCRIPT_ID;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Không thể tải Google Identity Services"));
    document.head.appendChild(script);
  });
};

/**
 * Lấy authorization code từ Google bằng popup. Sử dụng kèm endpoint /api/auth/google để đổi token.
 */
export const getGoogleAuthCode = async (): Promise<string> => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Thiếu NEXT_PUBLIC_GOOGLE_CLIENT_ID");
  }

  await loadGoogleScript();

  return new Promise((resolve, reject) => {
    const google = window.google;
    if (!google?.accounts?.oauth2) {
      reject(new Error("Google OAuth chưa sẵn sàng"));
      return;
    }

    const codeClient = google.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: "openid email profile",
      ux_mode: "popup",
      callback: (response: any) => {
        if (response?.code) {
          resolve(response.code);
        } else {
          reject(new Error(response?.error || "Không nhận được mã Google"));
        }
      },
      error_callback: (error: any) => {
        reject(new Error(error?.type || "Google sign-in bị hủy"));
      },
    });

    codeClient.requestCode();
  });
};
