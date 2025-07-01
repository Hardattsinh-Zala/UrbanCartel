import { useNavigate } from "react-router"

export function Error() {
    const navigate = useNavigate();
    return <>
        <section>
            <div className="error-hero">
                <div className="error-image">
                    <img src="/notfound.png" alt="error 404" />
                    <h1>The page you’re looking for ran away with our coffee.</h1><br />
                    <button onClick={() => navigate('/')}>Go home</button>
                </div>
            </div>
        </section>
    </>
}