import QueryBuilder from "../components/query-builder/query-builder.jsx";
import AuthModal from "../components/auth-modal/auth-modal.jsx";
import NavBar from "../components/nav-bar/nav-bar.jsx";

const Dashboard = () => {
    return (
        <>
            <AuthModal/>

            <div>
                <NavBar/>
            </div>

            <div>
                <QueryBuilder/>
            </div>
        </>
    )
};

export default Dashboard;