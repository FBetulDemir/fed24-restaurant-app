import heroVideo from '../assets/sushi-on-fire.mp4';
import "../styles/MainBanner.css";

const MainBanner = () => {
    return (
        <div className="main-banner">
            <video
                autoPlay
                loop
                muted
                src={heroVideo}
                className="video-background"
                type="video/mp4"
            />
            <div className="video-overlay">
                <button className="btn-hero">BOKA BORD</button>
                <button className="btn-hero">BESTÄLL ONLINE</button>
            </div>
        </div>
    );
}

export default MainBanner;