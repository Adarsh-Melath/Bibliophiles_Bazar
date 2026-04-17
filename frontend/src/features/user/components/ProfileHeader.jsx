import React from "react";

const ProfileHeader = () => {
  return (
    <div className="library-card rounded-3xl border border-[#D7CCC8] bg-white/80 p-6 text-[#548C8C] shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#548C8C]/70">Reader Profile</p>
          <h2 className="font-serif text-2xl">Account Overview</h2>
        </div>
        <button className="library-button rounded-full bg-[#9CAF88] px-5 py-2 font-semibold text-white">
          Manage
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;