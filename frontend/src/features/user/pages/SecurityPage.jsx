import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileSidebar from '../components/ProfileSidebar';
import { changePasswordSchema } from '../schemas/userSchema';
import { useChangePassword } from '../hooks/useChangePassword';
import { useAuthStore } from '../../../store/authStore';
import PageTransition from '../../../components/ui/PageTransition';
import { AlertCircle, CheckCircle, Shield, Key, Lock } from 'lucide-react';

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState('password');
  const { user } = useAuthStore();
  const { mutate: changePassword, isPending, isError, isSuccess } = useChangePassword();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    changePassword({
      email: user.email,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    });
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col font-body selection:bg-burgundy/10">
      {/* PageTransition commented for performance */}
      {/* <PageTransition> */}
        <main className="flex-grow container mx-auto px-6 md:px-12 pt-32 pb-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="lg:w-80 flex-shrink-0">
              <ProfileSidebar
                activeSection="security"
                onSectionChange={(s) => s !== 'security' && navigate('/profile')}
              />
            </div>

            <div className="flex-grow min-w-0">
              <div className="mb-10">
                <h1 className="font-heading text-4xl font-bold text-shelf tracking-tight">Security</h1>
                <p className="font-ui text-[10px] font-bold text-shelf/40 uppercase tracking-widest mt-2">Manage your account security</p>
              </div>

              <div className="flex gap-4 mb-8 border-b border-shelf/10">
                {['password', 'two-factor', 'sessions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-4 font-bold uppercase tracking-widest text-[10px] transition-colors ${
                      activeTab === tab
                        ? 'text-burgundy border-b-2 border-burgundy'
                        : 'text-shelf/40 hover:text-shelf'
                    }`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {activeTab === 'password' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-md"
                >
                  <div className="bg-shelf/5 border border-shelf/10 rounded-sm p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-burgundy rounded-sm flex items-center justify-center">
                        <Key size={20} className="text-paper" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-paper">Change Password</h3>
                        <p className="font-ui text-[10px] text-shelf/40 uppercase tracking-widest">Update your account password</p>
                      </div>
                    </div>

                    {isSuccess && (
                      <div className="mb-6 p-4 bg-green/10 border border-green/20 rounded-sm flex items-center gap-3">
                        <CheckCircle size={20} className="text-green" />
                        <span className="font-body text-sm text-green">Password changed successfully</span>
                      </div>
                    )}

                    {isError && (
                      <div className="mb-6 p-4 bg-red/10 border border-red/20 rounded-sm flex items-center gap-3">
                        <AlertCircle size={20} className="text-red" />
                        <span className="font-body text-sm text-red">Failed to change password</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block font-ui text-[10px] uppercase tracking-widest text-shelf/40 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          className="w-full bg-paper border border-shelf/10 rounded-sm px-4 py-3 font-body text-sm text-shelf focus:border-burgundy focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-ui text-[10px] uppercase tracking-widest text-shelf/40 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          className="w-full bg-paper border border-shelf/10 rounded-sm px-4 py-3 font-body text-sm text-shelf focus:border-burgundy focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-ui text-[10px] uppercase tracking-widest text-shelf/40 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="w-full bg-paper border border-shelf/10 rounded-sm px-4 py-3 font-body text-sm text-shelf focus:border-burgundy focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-[11px] px-8 py-4 shadow-shelf hover:bg-burgundy transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isPending ? 'Updating...' : 'Update Password'}
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {activeTab === 'two-factor' && (
                <div className="max-w-md">
                  <div className="bg-shelf/5 border border-shelf/10 rounded-sm p-8 text-center">
                    <Shield size={48} className="text-shelf/20 mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-bold text-shelf mb-2">Two-Factor Authentication</h3>
                    <p className="font-body text-shelf/40 mb-6">Add an extra layer of security to your account</p>
                    <button className="bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-[11px] px-8 py-4 shadow-shelf hover:bg-burgundy transition-all duration-500">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'sessions' && (
                <div className="max-w-md">
                  <div className="bg-shelf/5 border border-shelf/10 rounded-sm p-8 text-center">
                    <Lock size={48} className="text-shelf/20 mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-bold text-shelf mb-2">Active Sessions</h3>
                    <p className="font-body text-shelf/40 mb-6">Manage your active login sessions</p>
                    <button className="bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-[11px] px-8 py-4 shadow-shelf hover:bg-burgundy transition-all duration-500">
                      View All Sessions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      {/* </PageTransition> */}
    </div>
  );
}
