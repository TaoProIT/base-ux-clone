
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Config: Prefer Env vars, fallback to hardcoded strings
        const TARGET_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!TARGET_URL) {
            return NextResponse.json({ success: false, message: "API URL not configured" }, { status: 500 });
        }
        const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

        console.log("Proxy Request to:", TARGET_URL);
        // console.log("Proxy Body:", JSON.stringify(body)); // Uncomment if deep debug needed

        // Extract headers to forward
        const username = request.headers.get("username") || "";
        const role = request.headers.get("role") || "";

        const response = await fetch(TARGET_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(API_TOKEN ? { "X-SOF-USER-TOKEN": API_TOKEN } : {}),
                "username": username,
                "role": role
            },
            body: JSON.stringify(body),
        });

        console.log("Backend Response Status:", response.status);

        // Read text first to debug if not JSON
        let responseText = await response.text();
        const originalText = responseText; // Keep for debug

        // 1. Clean whitespace
        responseText = responseText.trim();

        // 2. Remove BOM (Byte Order Mark) if present (common in PHP)
        if (responseText.charCodeAt(0) === 0xFEFF) {
            responseText = responseText.slice(1);
        }

        try {
            const data = JSON.parse(responseText);
            return NextResponse.json(data);
        } catch (jsonError) {
            console.warn("Standard JSON parse failed, attempting extraction...");
            console.log("Response Text (first 1000 chars):", originalText.substring(0, 1000));

            // 3. Helper to extract FIRST valid JSON object/array using bracket balancing
            // This handles concatenated JSON (e.g., {...error...}[...data...]) by extracting the FIRST complete structure.
            const extractFirstJson = (text: string, startChar: string, endChar: string) => {
                const start = text.indexOf(startChar);
                if (start === -1) return null;

                let balance = 0;
                for (let i = start; i < text.length; i++) {
                    const c = text[i];
                    if (c === startChar) balance++;
                    else if (c === endChar) balance--;

                    if (balance === 0) {
                        try {
                            const jsonStr = text.substring(start, i + 1);
                            console.log("Attempting to parse extracted JSON:", jsonStr.substring(0, 200));
                            return JSON.parse(jsonStr);
                        } catch (e) {
                            console.log("Failed to parse extracted JSON segment");
                            return null;
                        }
                    }
                }
                return null;
            };

            // Helper to extract LAST valid JSON (for array data at the end)
            const extractLastJson = (text: string, startChar: string, endChar: string) => {
                const end = text.lastIndexOf(endChar);
                if (end === -1) return null;

                let balance = 0;
                for (let i = end; i >= 0; i--) {
                    const c = text[i];
                    if (c === endChar) balance++;
                    else if (c === startChar) balance--;

                    if (balance === 0) {
                        try {
                            const jsonStr = text.substring(i, end + 1);
                            return JSON.parse(jsonStr);
                        } catch (e) {
                            return null;
                        }
                    }
                }
                return null;
            };

            // 1. Try Object FIRST (Login/Register returns Object as FIRST JSON in concatenated response)
            const objectData = extractFirstJson(responseText, '{', '}');
            if (objectData) {
                console.log("✅ Successfully extracted FIRST object data (login/register)");
                return NextResponse.json(objectData);
            }

            // 2. Try Array LAST (Pricing returns Array at end, when no object is present)
            const arrayData = extractLastJson(responseText, '[', ']');
            if (arrayData) {
                console.log("✅ Successfully extracted LAST array data (pricing)");
                return NextResponse.json(arrayData);
            }

            // 3. Last resort: Try to find JSON using regex for common PHP warning patterns
            const jsonMatch = originalText.match(/(\{[\s\S]*\}|\[[\s\S]*\])$/);
            if (jsonMatch) {
                try {
                    const data = JSON.parse(jsonMatch[1]);
                    console.log("✅ Successfully extracted JSON using regex fallback");
                    return NextResponse.json(data);
                } catch (e) {
                    console.log("❌ Regex fallback also failed");
                }
            }

            console.error("❌ All JSON extraction methods failed");
            console.error("Full Backend Response:", originalText);
            return NextResponse.json(
                {
                    success: false,
                    message: "Server backend trả về dữ liệu không hợp lệ (không phải JSON)",
                    debug_text: originalText.substring(0, 1000) // Increase debug length
                },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error("Proxy Error Details:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Lỗi kết nối đến server backend",
                error_detail: error.message
            },
            { status: 500 }
        );
    }
}
