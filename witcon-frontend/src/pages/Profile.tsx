import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Camera, Edit, X, FileText, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from "../components/text/Header";
import Title from "../components/text/Title";
import Text from "../components/text/Text";


interface AttendeeData {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  schoolOther?: string;
  fieldOfStudy: string;
  levelOfStudy: 'Undergraduate' | 'Graduate' | 'Post-Doctorate';
  yearLevel?: string;
  resume?: string;
  linkedin?: string;
  github?: string;
  discord?: string;
  profileImage?: string;
  shirtSize?: string;
}

export default function Profile() {
  const { userId, logout } = useAuth();               // get logged-in user ID
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [showResumeViewer, setShowResumeViewer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [attendeeData, setAttendeeData] = useState<AttendeeData>({
    firstName: 'Ariana',
    lastName: 'Casas',
    email: 'aricasa@gmail.com',
    school: 'Harvard University',
    fieldOfStudy: 'Computer Science',
    levelOfStudy: 'Undergraduate',
    discord: 'Ariana#1234',
    linkedin: 'linkedin.com/in/ariana-casas',
    github: 'github.com/ariana-casas',
  });
  const iconOptions = [
    "profilePic1.png",
    "profilePic2.png",
    "profilePic3.png",
    "profilePic4.png",
    "profilePic5.png",
    "profilePic6.png",
  ];

  const [showIconPicker, setShowIconPicker] = useState(false);

  const [editData, setEditData] = useState<AttendeeData>({ ...attendeeData });

  const API_URL = import.meta.env.VITE_API_URL || 'https://witcon.duckdns.org/backend-api';

  // Fetch attendee profile when userId changes
  useEffect(() => {
    if (!userId) return; // safety: don't fetch if no user logged in

    setLoading(true);
    fetch(`${API_URL}/attendees/${userId}/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile data');
        return res.json();
      })
      .then((data: AttendeeData) => {
        setAttendeeData(data);
        setEditData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...attendeeData });
  };

  const handleSave = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_URL}/attendees/${userId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error('Failed to save profile');
      const updated: AttendeeData = await res.json();
      setAttendeeData(updated);
      setIsEditing(false);
      console.log('Profile updated:', updated);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...attendeeData });
  };

  const handleInputChange = <K extends keyof AttendeeData>(field: K, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value } as AttendeeData));
  };

  const handleResumeUpdate = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!userId) return;
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch(`${API_URL}/attendees/${userId}/`, {
        method: 'PATCH',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to upload resume');
      const updated: AttendeeData = await res.json();
      setAttendeeData(updated);
      console.log('Resume updated:', file.name);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCheckIn = () => setShowQRScanner(true);
  const handleQRScan = () => {
    setShowQRScanner(false);
    alert('Check-in successful! Welcome to WiTCON 2025!');
  };

  const handleLogout = () => {
    logout(); // clears the userId in context
  };


  // if (!userId) {
  //   return (
  //     <section className="space-y-4">
  //       <h2 className="text-2xl font-bold">Login</h2>
  //       <div className="bg-white border rounded p-6 text-center space-y-4">
  //         <p>Please log in to view your attendee profile.</p>
  //       </div>
  //     </section>
  //   );
  // }

  // if (loading) return <p>Loading profile...</p>;
  // if (error) return <p className="text-red-600">Error: {error}</p>;

return (
  <section className="space-y-8 px-4 py-6">
    {/* Profile Header */}
    <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 rounded-full border-4 border-[color:var(--color-primary-pink)] overflow-hidden">
          <img
            src={`/images/${attendeeData.profileImage || "profilePic1.png"}`}
            alt="Profile Icon"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-2xl font-bold text-[color:var(--color-primary-pink)]"> {attendeeData.firstName} {attendeeData.lastName}
          </h2> 
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setShowIconPicker(true)}
              className="bg-[color:var(--color-secondary-yellow)] text-[color:var(--color-primary-pink)] px-3 py-1 rounded-full hover:bg-[color:var(--color-primary-yellow)] transition"
            >
              Change Icon
            </button>
            <button
              onClick={handleCheckIn}
              className="bg-[color:var(--color-secondary-yellow)] text-[color:var(--color-primary-pink)] px-3 py-1 rounded-full hover:bg-[color:var(--color-primary-yellow)] transition"
            >
              Check In
            </button>
          </div>
        </div>
      </div>

      {/* Right: Edit Button */}
      <button onClick={handleEdit} className="mt-4 md:mt-0">
        <img
          src="/images/editIcon.png"
          alt="Edit"
          className="w-8 h-8 hover:scale-105 transition-transform"
        />
      </button>
    </div>

    {/* Profile Information */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 items-start">
      {/* Academic Info */}
      <div className="bg-[color:var(--color-tertiary-yellow)] p-6 rounded-xl shadow-md space-y-4">
        {/* Field of Study */}
        <div className="flex items-center gap-4">
            <label className="text-[color:var(--color-primary-brown)] font-medium min-w-[100px]">Major:</label>
            <div className="flex-1">
              <input
                type="text"
                value={attendeeData.fieldOfStudy || ""}
                readOnly
                className="flex-1 px-4 py-2 rounded-full bg-white text-[color:var(--color-primary-brown)] font-[Actor] w-fit min-w-[150px]"
              />
            </div>
          </div>
        {/* School */}
        <div className="flex items-center gap-4">
            <label className="text-[color:var(--color-primary-brown)] font-medium min-w-[100px]">School:</label>
            <div className="flex-1">
              <input
                type="text"
                value={attendeeData.school || attendeeData.schoolOther || ""}
                readOnly
                className="flex-1 px-4 py-2 rounded-full bg-white text-[color:var(--color-primary-brown)] font-[Actor] w-fit min-w-[150px]"
              />
            </div>
          </div>
        {/* Level of Study */}
        <div className="flex items-center gap-4">
            <label className="text-[color:var(--color-primary-brown)] font-medium min-w-[100px]">Level of Study:</label>
            <div className="flex-1">
              <input
                type="text"
                value={attendeeData.levelOfStudy || ""}
                readOnly
                className="flex-1 px-4 py-2 rounded-full bg-white text-[color:var(--color-primary-brown)] font-[Actor] w-fit min-w-[150px]"
              />
            </div>
          </div>
      </div>

      {/* Resume & Socials */}
      <div className="bg-[color:var(--color-tertiary-yellow)] p-6 rounded-xl shadow-md space-y-4">
        {/* Resume Upload Section */}
        <div className="flex items-center gap-4">
          <img src="/images/pdfIcon.png" alt="PDF Icon" className="w-20 h-20" />
            <p className="text-sm text-[color:var(--color-primary-brown)] font-[Actor] text-center w-full">
              You only have a limit of 2 more resume uploads.
            </p>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center gap-4">
          <label className="text-[color:var(--color-primary-brown)] font-medium min-w-[100px]">LinkedIn:</label>
            <input
              type="text"
              value={attendeeData.linkedin || ""}
              readOnly
              className="flex-1 px-4 py-2 rounded-full bg-white text-[color:var(--color-primary-brown)] font-[Actor] w-fit min-w-[150px]"
            />
        </div>
        {/* GitHub */}
        <div className="flex items-center gap-4">
          <label className="text-[color:var(--color-primary-brown)] font-medium min-w-[100px] w-fit min-w-[100px]">GitHub:</label>
          <input
            type="text"
            value={attendeeData.github || ""}
            readOnly
            className="flex-1 px-4 py-2 rounded-full bg-white text-[color:var(--color-primary-brown)] font-[Actor] w-fit min-w-[150px]"
          />
        </div>

        {/* Discord */}
        <div className="flex items-center gap-4">
          <label className="text-[color:var(--color-primary-brown)] font-medium min-w-[100px]">Discord Username:</label>
          <input
            type="text"
            value={attendeeData.discord || ""}
            readOnly
            className="flex-1 px-4 py-2 rounded-full bg-white text-[color:var(--color-primary-brown)] font-[Actor] w-fit min-w-[150px]"
          />
        </div>
      </div>

      {/* Witcon Resources */}
      <div className="bg-[color:var(--color-tertiary-yellow)] p-6 rounded-xl shadow-md space-y-4">
        <h3 className="font-semibold text-lg text-[color:var(--color-primary-brown)]">Make the best of WiTCON</h3>
        
        {/* WiTCON  ‘26 Attendee Guide  */}
          <div className="flex items-center gap-3">
            <img src="/images/notionIcon.png" alt="Notion Icon" className="w-6 h-6" />
              <a
                href="https://www.notion.so/WiTCON-2026-Attendee-Guide"
                target="_blank"
                className="w-full px-4 py-2 rounded-4xl bg-white text-[color:var(--color-primary-brown)] font-[Actor]"
              >
                WiTCON  ‘26 Attendee Guide 
              </a>
          </div>  

        {/* Discord */}
          <div className="flex items-center gap-3">
            <img src="/images/discordIcon.png" alt="Discord Icon" className="w-6 h-6" />
              <a
                href="https://discord.gg/wicsfiu"
                target="_blank"
                className="w-full px-4 py-2 rounded-4xl bg-white text-[color:var(--color-primary-brown)] font-[Actor]"
              >
                WiCS Discord
              </a>
          </div>        
        
        {/* LinkedIn */}
          <div className="flex items-center gap-3">
            <img src="/images/linkedInIcon.png" alt="Linkedin Icon" className="w-6 h-6" />
              <a
                href="https://www.linkedin.com/company/wicsatfiu/"
                target="_blank"
                className="w-full px-4 py-2 rounded-4xl bg-white text-[color:var(--color-primary-brown)] font-[Actor]"
              >
                WiCS LinkedIn
              </a>
          </div>
        {/* Instagram */}
          <div className="flex items-center gap-3">
            <img src="/images/instagramIcon.png" alt="Instagram Icon" className="w-6 h-6" />
              <a
                href="https://instagram.com/wicsfiu"
                target="_blank"
                className="w-full px-4 py-2 rounded-4xl bg-white text-[color:var(--color-primary-brown)] font-[Actor]"
              >
                WiCS Instagram
              </a>
          </div>
      
      {/* REPORT AN INCIDENT box */}
      </div>
      <div className="bg-[color:var(--color-tertiary-yellow)] p-6 rounded-xl shadow-md space-y-4">

        <h3 className="font-semibold text-2xl text-[color:var(--color-primary-brown)]">REPORT AN INCIDENT</h3>
        <p className="text-sm text-gray-700">
          Please, if you feel uncomfortable or witness inappropriate behavior at WiTCON. Please report it using the link below.
        </p>
          <a
            href="https://discord.gg/wicsfiu"
            target="_blank"
            className="inline-block bg-[color:var(--color-primary-pink)] text-[color:var(--color-tertiary-yellow)] px-4 py-2 rounded-full hover:bg-pink-700 transition"
          >
            REPORT
        </a>
      </div>
    </div>
  </section>
);
}
  