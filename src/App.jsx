import reactLogo from './assets/images/react.svg';
import grafanaLogo from './assets/images/grafana-svgrepo-com.svg';
import influxLogo from './assets/images/influxdb-svgrepo-com.svg';
import jsLogo from './assets/images/logo-javascript.svg';
import sassLogo from './assets/images/sass-svgrepo-com.svg';
import tailwindLogo from './assets/images/tailwind-svgrepo-com.svg';
import viteLogo from '/vite.svg';
import './App.css';
import GlassPane from "./components/glass-pane/glass-pane.jsx";
import Button from "./components/button/button.jsx";
import styles from "./app.module.scss";

// Landing page
const App = () => {
    const heading = (
        <h1>
            Welcome to UG02's InfluxDB No Code Interface
        </h1>
    );

    const techStack = (
        <div className={styles.techStackWrapper}>
            <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo"/>
            </a>

            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo"/>
            </a>

            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
                <img src={jsLogo} className="logo react" alt="JS logo"/>
            </a>

            <a href="https://v2.tailwindcss.com/" target="_blank">
                <img src={tailwindLogo} className="logo react" alt="Tailwind logo"/>
            </a>

            <a href="https://sass-lang.com/" target="_blank">
                <img src={sassLogo} className="logo react" alt="Sass logo"/>
            </a>

            <a href="https://www.influxdata.com/" target="_blank">
                <img src={influxLogo} className="logo react" alt="Influx logo"/>
            </a>

            <a href="https://grafana.com/" target="_blank">
                <img src={grafanaLogo} className="logo react" alt="Grafana logo"/>
            </a>
        </div>
    );

    const navigateToDashboard = () => {
        window.location.href = "/dashboard";
    }

    const letsBeginButton = (
        <Button
            onClick={navigateToDashboard}
        >
            Access The Database
        </Button>
    );

    return (
        <main
            className={styles.mainBackground}
        >
            <GlassPane landingPage>
                {heading}

                {techStack}

            </GlassPane>

            {letsBeginButton}
        </main>
    )
};

export default App;
