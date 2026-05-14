import { Outlet } from "react-router-dom"
import AdminSideBar from '../components/AdminSideBar'
import AdminTopBar from "../components/AdminTopBar"

export default function AdminLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-paper">
            <AdminSideBar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminTopBar />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
