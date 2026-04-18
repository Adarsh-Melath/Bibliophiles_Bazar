import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../../../store/authStore";

export default function OAuthCallbackPage() {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const handled = useRef(false);

    useEffect(() => {
        // Guard against React 18 Strict Mode double-invoke
        if (handled.current) return;

        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            handled.current = true;
            try {
                const decoded = jwtDecode(token);
                const user = {
                    email: decoded.sub,
                    role: decoded.role,
                };
                setAuth(token, user);
                navigate("/", { replace: true });
            } catch {
                navigate("/login", { replace: true });
            }
        }
        // If no token, do nothing — this fires on the second Strict Mode
        // run after we've already navigated away, so the URL is clean.
    }, []);

    return (
        <div className="library-shell flex items-center justify-center">
            <p className="library-muted">Signing you in...</p>
        </div>
    );
}
