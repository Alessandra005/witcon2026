import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    password: string;
    dateOfBirth: string;
    country: string;
    state: string;
    raceEthnicity: string;
    raceOther: string;
    gender: string;           
    genderOther: string;
    levelOfStudy: string;
    yearLevel: string;
    studyOther: string;
    fieldOfStudy: string;
    fieldOther: string;
    school: string;
    schoolOther: string;
    pantherID: string;
    linkedin: string;
    github: string;
    website: string;
    discord: string;
    shirtSize: string;
    foodAllergies: string[];
    customAllergy: string;
    codeOfConduct: boolean;
    photographyConsent: boolean;
}

interface FormErrors {
    [key: string]: string;
}

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        dateOfBirth: '',
        country: '',
        state: '',
        raceEthnicity: '',
        raceOther: '',
        gender: '',
        genderOther: '',
        levelOfStudy: '',
        yearLevel: '',
        studyOther: '',
        fieldOfStudy: '',
        fieldOther: '',
        school: '',
        schoolOther: '',
        pantherID: '',
        linkedin: '',
        github: '',
        website: '',
        discord: '',
        shirtSize: '',
        foodAllergies: [],
        customAllergy: '',
        codeOfConduct: false,
        photographyConsent: false
    });

    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Options
    const countries = [
        'Prefer not to answer',
        'United States',
        'Canada',
        'Mexico',
        'Brazil',
        'United Kingdom',
        'Germany',
        'France',
        'Spain',
        'Italy',
        'China',
        'Japan',
        'India',
        'Australia',
        'Other'
      ];

    const usStates = [        'Prefer not to answer',
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
        'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
        'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
        'Wisconsin', 'Wyoming'
      ];

    const raceOptions = [
        'White',
        'Hispanic or Latine',
        'Black or African American',
        'Asian',
        'Native American or Alaskan Native',
        'Native Hawaiian or Other Pacific Islander',
        'Middle Eastern',
        'Other',
        'Prefer not to answer'
      ];

    const studyLevels = [
        'Undergraduate',
        'Graduate',
        'Post-Doctorate',
        'Other',
        'I\'m not a student',
        'Prefer not to answer'
      ];

    const yearLevels = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Prefer not to answer'];
    const genderOptions = ['Woman', 'Man', 'Non-binary', 'Other'];

    const fieldsOfStudy = [
        'Computer Science',
        'Information Technology',
        'Software Engineering',
        'Computer Engineering',
        'Data Science',
        'Cybersecurity',
        'Information Systems',
        'Web Development',
        'Game Development',
        'Business',
        'Engineering',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
        'Psychology',
        'Other'];

    const schools = [        
        'Florida International University',
        'University of Florida',
        'Florida State University',
        'University of Central Florida',
        'Florida Institute of Technology',
        'Nova Southeastern University',
        'Florida Atlantic University',
        'University of South Florida',
        'Florida A&M University',
        'Florida Polytechnic University',
        'Harvard University',
        'MIT',
        'Stanford University',
        'UC Berkeley',
        'Georgia Tech',
        'Carnegie Mellon',
        'Other'];

    const shirtSizes = ['S', 'M', 'L', 'XL'];
    const allergyOptions = ['Peanuts', 'Tree Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy', 'Eggs'];
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle input change
    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle file input
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const validateAge = (dateOfBirth: string) => {
        const birthDate = new Date(dateOfBirth);
        const conferenceDate = new Date('2026-03-27');
        let age = conferenceDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = conferenceDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && conferenceDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    };

    const validatePantherID = (id: string) => {
        if (id.length !== 7 || !/^\d{7}$/.test(id)) return false;
        const invalidIDs = ['0000000','1111111','2222222','3333333','4444444','5555555','6666666','7777777','8888888','9999999','1234567'];
        return !invalidIDs.includes(id);
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        //Basic Information
        if (!formData.firstName) newErrors.firstName = 'Required';
        if (!formData.lastName) newErrors.lastName = 'Required';
        if (!formData.email) newErrors.email = 'Required';
        if (!formData.confirmEmail) newErrors.confirmEmail = 'Required';
        if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Emails do not match';
        if (!formData.password) newErrors.password = 'Required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Required';
        else if (!validateAge(formData.dateOfBirth)) newErrors.dateOfBirth = 'Must be 18 or older by March 27, 2026';
        
        //Demographics
        if (!formData.country) newErrors.country = 'Required';
        if (formData.country === 'United States' && !formData.state) newErrors.state = 'Required';
        if (!formData.raceEthnicity) newErrors.raceEthnicity = 'Required';
        if (formData.raceEthnicity === 'Other' && !formData.raceOther) newErrors.raceOther = 'Required';
        if (!formData.gender) newErrors.gender = 'Required';
        if (formData.gender === 'Other' && !formData.genderOther) newErrors.genderOther = 'Required';

        //Academic Information
        if (!formData.levelOfStudy) newErrors.levelOfStudy = 'Required';
        if (formData.levelOfStudy === 'Undergraduate' && !formData.yearLevel) newErrors.yearLevel = 'Required';
        if (formData.levelOfStudy === 'Other' && !formData.studyOther) newErrors.studyOther = 'Required';
        if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Required';
        if (formData.fieldOfStudy === 'Other' && !formData.fieldOther) newErrors.fieldOther = 'Required';
        if (!formData.school) newErrors.school = 'Required';
        if (formData.school === 'Other' && !formData.schoolOther) newErrors.schoolOther = 'Required';
        if (formData.school === 'Florida International University' && !formData.pantherID) newErrors.pantherID = 'Required';
        if (formData.school === 'Florida International University' && formData.pantherID && !validatePantherID(formData.pantherID)) {
            newErrors.pantherID = 'Invalid Panther ID';
        }

        //Resume and Agreements
        if (!resumeFile) newErrors.resume = 'Required';
        if (!formData.shirtSize) newErrors.shirtSize = 'Required';
        if (!formData.codeOfConduct) newErrors.codeOfConduct = 'Required';
        if (!formData.photographyConsent) newErrors.photographyConsent = 'Required';

        setErrors(newErrors);
        console.log("Validation errors:", newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submit triggered");
        setErrors({});

        if (!validateForm()) return;

        const url = "https://witcon.duckdns.org/backend-api/attendees/create/";
        // const url = `${import.meta.env.VITE_API_URL}/attendees/create/`;

        const fd = new FormData();

        console.log("foodAllergies before stringify:", formData.foodAllergies); // Debug log
        Object.entries(formData).forEach(([k, v]) => {
            if (v === undefined || v === null) return;
            if (Array.isArray(v)) {
                fd.set(k, JSON.stringify(v));
            } else {
                fd.set(k, String(v));
            }
        });

        if (resumeFile) fd.append('resume', resumeFile);

        // Debug: Log FormData contents
        console.log("FormData being sent:");
        for (let pair of fd.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const res = await fetch(url, { method: "POST", body: fd });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                console.error("Backend error response:", data);
                setErrors(data);
            } else {
                const data = await res.json();
                console.log("Registration success:", data);
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error("Error sending data:", error);
            setErrors({ submit: "Registration failed. Please try again." });
        }
    };

    if (isSubmitted) {
        return (
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Registration Successful!</h2>
                <div className="bg-white border rounded p-4">
                    <p className="mb-2">Thank you for registering for WiTCON 2025!</p>
                    <p>A confirmation email has been sent to {formData.email}.</p>
                </div>
            </section>
        );
    }

return (
        <section className="space-y-4">
            <div className="text-center space-y-2 mb-6">
                <h2 className="text-3xl font-bold text-[color:var(--color-primary-pink)]"
                style={{ fontFamily: 'Bukhari, sans-serif' }}>Welcome to WiTCON! Please register here!</h2>
                <div className="text-sm space-x-4">
                    <span>
                        Already registered? <a href="#" className="text-blue-600 underline hover:text-blue-800">Log in</a>
                    </span>
                    <span>
                        <a href="#" className="text-blue-600 underline hover:text-blue-800">Reset password</a>
                    </span>
                </div>
            </div>

            {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
                    {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Information */}

                <div className="bg-[color:var(--color-tertiary-yellow)] rounded-xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-[color:var(--color-primary-pink)]"
                    style={{ fontFamily: 'Actor, sans-serif' }}>Register here</h3>

                    <div className="text-right text-sm">
                        <span className="text-gray-700 mr-2">Already Registered?</span>
                        <button
                            type="button"
                            className="bg-[color:var(--color-primary-yellow)] text-white font-semibold px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                        >
                            Click Here
                        </button>
                    </div>
                </div>
      
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">First Name *</label>
                            <input
                                id="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                                required
                            />
                            {errors.firstName && <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>}
                        </div>
                        
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Last Name *</label>
                            <input
                                id="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                                required
                            />
                            {errors.lastName && <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Email *</label>
                        <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        />
                        {errors.email && <div className="text-red-600 text-sm  mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="confirmEmail" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Confirm Email *</label>
                        <input
                            id="confirmEmail"
                            type="email"
                            value={formData.confirmEmail}
                            onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        />
                        {errors.confirmEmail && <div className="text-red-600 text-sm mt-1">{errors.confirmEmail}</div>}
                    </div>

                    /<div>
                        <label htmlFor="password" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Password *</label>
                        <input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        />
                        {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Date of Birth *</label>
                        <input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        />
                        <div className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Must be 18 or older by March 27, 2026</div>
                        {errors.dateOfBirth && <div className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</div>}
                    </div>
                </div>
                

                {/* Demographics */}
                <div className="bg-[color:var(--color-tertiary-yellow)] rounded-xl p-6 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-[color:var(--color-primary-pink)]" style={{ fontFamily: 'Actor, sans-serif' }}>
                        Demographics</h3>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Country of Residence *</label>
                        <select
                            id="country"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        >
                            <option value="">Select a country</option>
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        {errors.country && <div className="text-red-600 text-sm">{errors.country}</div>}
                    </div>

                    {formData.country === 'United States' && (
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">State of Residence *</label>
                            <select
                                id="state"
                                value={formData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                                required
                            >
                                <option value="">Select a state</option>
                                {usStates.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            {errors.state && <div className="text-red-600 text-sm mt-1">{errors.state}</div>}
                        </div>
                    )}

                {/* Gender */}
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Gender *</label>
                    <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                        required
                    >
                        <option value="">Select gender</option>
                        {genderOptions.map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                {       formData.gender === 'Other' && (
                    <input
                        type="text"
                        placeholder="Please specify"
                        value={formData.genderOther}
                        onChange={(e) => handleInputChange('genderOther', e.target.value)}
                        className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"

                        required
                    />
                        )}
                        {errors.gender && <div className="text-red-600 text-sm mt-1">{errors.gender}</div>}
                    </div>


                    <div>
                        <label htmlFor="raceEthnicity" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Race or Ethnicity *</label>
                        <select
                            id="raceEthnicity"
                            value={formData.raceEthnicity}
                            onChange={(e) => handleInputChange('raceEthnicity', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        >
                            <option value="">Select an option</option>
                            {raceOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {formData.raceEthnicity === 'Other' && (
                            <input
                                type="text"
                                placeholder="Please specify"
                                value={formData.raceOther}
                                onChange={(e) => handleInputChange('raceOther', e.target.value)}
                                className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            />
                        )}
                        {errors.raceEthnicity && <div className="text-red-600 text-sm mt-1">{errors.raceEthnicity}</div>}
                    </div>
                </div>

                {/* Academic Information */}
                <div className="bg-[color:var(--color-secondary-pink)] rounded-xl p-6 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-[color:var(--color-primary-pink)]" style={{ fontFamily: 'Actor, sans-serif' }}>Academic Information</h3>
                    
                    {/* Level of Study */}
                    <div>
                        <label htmlFor="levelOfStudy" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Current Level of Study *</label>
                        <select
                            id="levelOfStudy"
                            value={formData.levelOfStudy}
                            onChange={(e) => handleInputChange('levelOfStudy', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        >
                            <option value="">Select level</option>
                            {studyLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                        {errors.levelOfStudy && <div className="text-red-600 text-sm mt-1">{errors.levelOfStudy}</div>}
                    </div>

                    {/* Year Level (only if Undergraduate) */}
                    {formData.levelOfStudy === 'Undergraduate' && (
                    <div>
                        <label htmlFor="yearLevel" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Year Level *</label>
                        <select
                            id="yearLevel"
                            value={formData.yearLevel}
                            onChange={(e) => handleInputChange('yearLevel', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                    >
                            <option value="">Select year</option>
                             {yearLevels.map(year => (
                                    <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        {errors.yearLevel && <div className="text-red-600 text-sm mt-1">{errors.yearLevel}</div>}
                    </div>
                    )}


                    {formData.levelOfStudy === 'Other' && (
                        <input
                            type="text"
                            placeholder="Please specify level of study"
                            value={formData.studyOther}
                            onChange={(e) => handleInputChange('studyOther', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                        />
                    )}

                    <div>
                        <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Field of Study *</label>
                        <select
                            id="fieldOfStudy"
                            value={formData.fieldOfStudy}
                            onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        >
                            <option value="">Select field</option>
                            {fieldsOfStudy.map(field => (
                                <option key={field} value={field}>{field}</option>
                            ))}
                        </select>
                        {formData.fieldOfStudy === 'Other' && (
                            <input
                                type="text"
                                placeholder="Please specify field of study"
                                value={formData.fieldOther}
                                onChange={(e) => handleInputChange('fieldOther', e.target.value)}
                                className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            />
                        )}
                        {errors.fieldOfStudy && <div className="text-red-600 text-sm mt-1">{errors.fieldOfStudy}</div>}
                    </div>

                    <div>
                        <label htmlFor="school" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">School *</label>
                        <select
                            id="school"
                            value={formData.school}
                            onChange={(e) => handleInputChange('school', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        >
                            <option value="">Select school</option>
                            {schools.map(school => (
                                <option key={school} value={school}>{school}</option>
                            ))}
                        </select>
                        {formData.school === 'Other' && (
                            <input
                                type="text"
                                placeholder="Please specify school"
                                value={formData.schoolOther}
                                onChange={(e) => handleInputChange('schoolOther', e.target.value)}
                                className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            />
                        )}
                        {errors.school && <div className="text-red-600 text-sm mt-1">{errors.school}</div>}
                    </div>

                    {formData.school === 'Florida International University' && (
                        <div>
                            <label htmlFor="pantherID" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">Panther ID *</label>
                            <input
                                id="pantherID"
                                type="text"
                                value={formData.pantherID}
                                onChange={(e) => handleInputChange('pantherID', e.target.value)}
                                className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                                placeholder="7 digits"
                                maxLength={7}
                                required
                            />
                            <div className="text-sm text-gray-600">Must be 7 digits</div>
                            {errors.pantherID && <div className="text-red-600 text-sm mt-1">{errors.pantherID}</div>}
                        </div>
                    )}
                </div>

                {/* Social Profiles */}
                <div className="bg-[color:var(--color-secondary-pink)] rounded-xl p-6 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-[color:var(--color-primary-pink)]" style={{ fontFamily: 'Actor, sans-serif' }}>Social Profiles (Optional)</h3>
                    
                    <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">LinkedIn</label>
                        <input
                            id="linkedin"
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>

                    <div>
                        <label htmlFor="github" className="block text-sm font-medium text-[color:var(--color-primary-brown)]">GitHub Profile</label>
                        <input
                            id="github"
                            type="url"
                            value={formData.github}
                            onChange={(e) => handleInputChange('github', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            placeholder="https://github.com/yourusername"
                        />
                    </div>

                    <div>
                        <label htmlFor="website" className="block text-m font-medium text-[color:var(--color-primary-brown)]">Personal Website</label>
                        <input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            placeholder="https://yourwebsite.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="discord" className="block text-m font-medium text-[color:var(--color-primary-brown)]">Discord Username</label>
                        <input
                            id="discord"
                            type="text"
                            value={formData.discord}
                            onChange={(e) => handleInputChange('discord', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            placeholder="username#1234"
                        />
                    </div>
                    
                    {/* Resume */}
                    <div>
                        <label htmlFor="resume" className="text-xl font-bold text-[color:var(--color-primary-pink)]" style={{ fontFamily: 'Actor, sans-serif' }}>Resume Upload*</label>
                        <div className="border-2 border-dashed border-[color:var(--color-primary-pink)] rounded-xl p-4 bg-white text-center hover:border-pink-500 transition">
                        <input
                            id="resume"
                            type="file"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[color:var(--color-primary-pink)] file:text-white hover:file:bg-pink-600"
                            accept=".pdf"
                            required
                        />
                        {errors.resume && <div className="text-red-600 text-sm mt-2">{errors.resume}</div>}
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-[color:var(--color-secondary-mint)] rounded-xl p-6 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-[color:var(--color-primary-pink)]" style={{ fontFamily: 'Actor, sans-serif' }}>Additional Information</h3>
                    
                    {/* Shirt size */}
                    <div>
                        <label htmlFor="shirtSize" className="block text-m font-medium text-[color:var(--color-primary-brown)]">Shirt Size *</label>
                        <select
                            id="shirtSize"
                            value={formData.shirtSize}
                            onChange={(e) => handleInputChange('shirtSize', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                            required
                        >
                            <option value="">Select size</option>
                            {shirtSizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                        {errors.shirtSize && <div className="text-red-600 text-sm mt-1">{errors.shirtSize}</div>}
                    </div>

                {/* Food Allergies dropdown */}
                <div className="relative">
                    <label htmlFor="foodAllergies" className="block text-m font-medium text-[color:var(--color-primary-brown)]">Food Allergies</label>
                    {/* Dropdown container */}
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="mt-1 block w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                    >
                        {formData.foodAllergies.length > 0
                            ? formData.foodAllergies.join(", ")
                            : "Select allergies"}
                        <span className="ml-2">
                            {isDropdownOpen ? "▲" : "▼"}
                        </span>
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="mt-2 space-y-2">
                            {allergyOptions.map((allergy) => (
                                <div key={allergy} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={allergy}
                                        checked={formData.foodAllergies.includes(allergy)}
                                        onChange={() => {
                                            const selected = formData.foodAllergies.includes(allergy)
                                                ? formData.foodAllergies.filter((a) => a !== allergy)
                                                : [...formData.foodAllergies, allergy];
                                            handleInputChange("foodAllergies", selected);
                                        }}
                                        className="accent-[color:var(--color-primary-pink)] w-4 h-4"
                                    />
                                    <span className="text-m text-[color:var(--color-primary-brown)]">{allergy}</span>
                                </div>
                            ))}
                    
                    {/* "Other" option */}
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            value="Other"
                            checked={formData.foodAllergies.includes("Other")}
                            onChange={() => {
                                const selected = formData.foodAllergies.includes("Other")
                                    ? formData.foodAllergies.filter((a) => a !== "Other")
                                    : [...formData.foodAllergies, "Other"];
                                handleInputChange("foodAllergies", selected);
                        }}
                        className="accent-[color:var(--color-primary-pink)] w-4 h-4"
                    />
                    <span className="text-m text-[color:var(--color-primary-brown)]">Other</span>
                    </div>

                    {/* Custom input when "Other" selected */}
                    {formData.foodAllergies.includes("Other") && (
                        <input
                            type="text"
                            placeholder="Please specify"
                            value={formData.customAllergy || ""}
                            onChange={(e) =>
                                handleInputChange("customAllergy", e.target.value)
                            }
                            className="w-full border-2 border-primary rounded-md px-3 py-2 mt-2 text-textBrown focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
                        />
                    )}
                </div>
            )}
        </div>
        </div>

                {/* Agreements */}
                <div className="block text-m font-medium text-[color:var(--color-primary-brown)]">
                    <h3 className="font-semibold">Agreements</h3>
                    
                    <div>
                        <label className="flex items-start">
                            <input
                                type="checkbox"
                                checked={formData.codeOfConduct}
                                onChange={(e) => handleInputChange('codeOfConduct', e.target.checked)}
                                className="mr-2 mt-1"
                                required
                            />
                            <span>I have read and agreed to the <a href="#" className="text-blue-600 underline">WiTCON Code of Conduct</a> *</span>
                        </label>
                        {errors.codeOfConduct && <div className="text-red-600 text-sm">{errors.codeOfConduct}</div>}
                    </div>

                    <div>
                        <label className="flex items-start">
                            <input
                                type="checkbox"
                                checked={formData.photographyConsent}
                                onChange={(e) => handleInputChange('photographyConsent', e.target.checked)}
                                className="mr-2 mt-1"
                                required
                            />
                            <span>I consent to being photographed and/or recorded during the event for promotional purposes *</span>
                        </label>
                        {errors.photographyConsent && <div className="text-red-600 text-sm">{errors.photographyConsent}</div>}
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>
                </div>
            </form>
        </section>
    );
}

