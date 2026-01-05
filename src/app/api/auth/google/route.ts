import { NextRequest, NextResponse } from "next/server";

const normalizeApiUrl = (url?: string) => {
  if (!url) return "";
  return url.replace(/\\/g, "/");
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const code = body?.code as string | undefined;

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Missing Google authorization code" },
        { status: 400 }
      );
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "postmessage";

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Chưa cấu hình GOOGLE_CLIENT_ID hoặc GOOGLE_CLIENT_SECRET",
        },
        { status: 500 }
      );
    }

    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    const tokenText = await tokenRes.text();
    let tokenJson: any = {};
    try {
      tokenJson = tokenText ? JSON.parse(tokenText) : {};
    } catch (e) {
      tokenJson = {};
    }

    if (!tokenRes.ok || !tokenJson?.id_token) {
      const detail = tokenJson?.error_description || tokenJson?.error || tokenText || "Unknown error";
      return NextResponse.json(
        {
          success: false,
          message: "Không thể lấy token từ Google",
          detail,
          raw: tokenText,
        },
        { status: 502 }
      );
    }

    const idToken = tokenJson.id_token as string;

    // Verify id_token payload
    const tokenInfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    const tokenInfoText = await tokenInfoRes.text();
    let tokenInfo: any = {};
    try {
      tokenInfo = tokenInfoText ? JSON.parse(tokenInfoText) : {};
    } catch (e) {
      tokenInfo = {};
    }

    if (!tokenInfo || tokenInfo.aud !== clientId || !tokenInfo.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Xác thực Google không hợp lệ",
          detail: tokenInfo?.error || tokenInfoText || "Invalid token audience",
        },
        { status: 401 }
      );
    }

    const profile = {
      email: tokenInfo.email as string,
      name: (tokenInfo.name as string) || (tokenInfo.email as string),
      sub: tokenInfo.sub as string,
      picture: (tokenInfo.picture as string) || "",
    };

    const apiUrl = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);
    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: "Thiếu NEXT_PUBLIC_API_URL" },
        { status: 500 }
      );
    }

    let backendRes: Response;
    try {
      backendRes = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-SOF-USER-TOKEN": process.env.NEXT_PUBLIC_API_TOKEN || "",
        },
        body: JSON.stringify({
          method: "googleLogin",
          email: profile.email,
          name: profile.name,
          phone: "",
          googleId: profile.sub,
          avatar: profile.picture,
        }),
      });
    } catch (err: any) {
      return NextResponse.json(
        {
          success: false,
          message: "Không kết nối được backend ERP",
          detail: err?.message,
          apiUrl,
        },
        { status: 500 }
      );
    }

    const backendText = await backendRes.text();
    let backendJson: any;
    try {
      backendJson = backendText ? JSON.parse(backendText) : {};
    } catch (e) {
      backendJson = {
        success: false,
        message: "Server backend trả về dữ liệu không hợp lệ",
        raw: backendText,
      };
    }

    return NextResponse.json(backendJson, { status: backendRes.status });
  } catch (error: any) {
    console.error("Google auth error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Đăng nhập Google thất bại, vui lòng thử lại",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
