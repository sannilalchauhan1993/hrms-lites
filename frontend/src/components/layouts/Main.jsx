import { Outlet } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import './main.css';

export default function Main() {
    return (
        <div className="layout">
            <NavigationMenu />
            <main className="main-content">
                <div className="content-wrapper">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
