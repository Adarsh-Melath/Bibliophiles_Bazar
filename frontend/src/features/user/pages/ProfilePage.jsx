import { useState } from 'react'
import ProfileSidebar from '../components/ProfileSidebar'
import PersonalInfo from '../components/PersonalInfo'
import RecentOrders from '../components/RecentOrders'
import WishlistPreview from '../components/WishlistPreview'

export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState('personal')

    const renderContent = () => {
        switch (activeSection) {
            case 'personal':
                return <PersonalInfo />
            case 'orders':
                return <RecentOrders />
            case 'wishlist':
                return <WishlistPreview />
            default:
                return <PersonalInfo />
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="h-16 bg-white border-b border-accent shadow-sm" />

            <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">

                <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

                <div className="flex-1 min-w-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}