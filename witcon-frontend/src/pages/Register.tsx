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
        setErrors({});

        if (!validateForm()) return;

        const url = "https://witcon.duckdns.org/backend-api/attendees/create/";
        // const url = `${import.meta.env.VITE_API_URL}/attendees/create/`;

        const fd = new FormData();

        Object.entries(formData).forEach(([k, v]) => {
            if (v === undefined || v === null) return;
            fd.append(k, String(v));
        });

        if (resumeFile) fd.append('resume', resumeFile);

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
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Registration</h2>
                <div className="text-sm space-x-4">
                    <span>Already registered? <a href="#" className="text-blue-600 underline">Log in</a></span>
                    <span><a href="#" className="text-blue-600 underline">Reset password</a></span>
                </div>
            </div>

            {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
                    {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Information */}
                <div className="bg-white border rounded p-4 space-y-4">
                    <h3 className="font-semibold">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block font-medium">First Name *</label>
                            <input
                                id="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                            {errors.firstName && <div className="text-red-600 text-sm">{errors.firstName}</div>}
                        </div>
                        
                        <div>
                            <label htmlFor="lastName" className="block font-medium">Last Name *</label>
                            <input
                                id="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                            {errors.lastName && <div className="text-red-600 text-sm">{errors.lastName}</div>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-medium">Email *</label>
                        <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="confirmEmail" className="block font-medium">Confirm Email *</label>
                        <input
                            id="confirmEmail"
                            type="email"
                            value={formData.confirmEmail}
                            onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        {errors.confirmEmail && <div className="text-red-600 text-sm">{errors.confirmEmail}</div>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium">Password *</label>
                        <input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth" className="block font-medium">Date of Birth *</label>
                        <input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        <div className="text-sm text-gray-600">Must be 18 or older by March 27, 2026</div>
                        {errors.dateOfBirth && <div className="text-red-600 text-sm">{errors.dateOfBirth}</div>}
                    </div>
                </div>

                {/* Demographics */}
                <div className="bg-white border rounded p-4 space-y-4">
                    <h3 className="font-semibold">Demographics</h3>
                    
                    <div>
                        <label htmlFor="country" className="block font-medium">Country of Residence *</label>
                        <select
                            id="country"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="w-full border rounded px-3 py-2"
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
                            <label htmlFor="state" className="block font-medium">State of Residence *</label>
                            <select
                                id="state"
                                value={formData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            >
                                <option value="">Select a state</option>
                                {usStates.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            {errors.state && <div className="text-red-600 text-sm">{errors.state}</div>}
                        </div>
                    )}

{/* { <div>
    <label htmlFor="genderIdentity" className="block font-medium">Gender Identity *</label>
    <select
        id="genderIdentity"
        value={formData.genderIdentity[0] || ''} // store single selection in array
        onChange={(e) => handleInputChange('genderIdentity', [e.target.value])}
        className="w-full border rounded px-3 py-2"
        required
    >
        <option value="">Select gender identity</option>
        {genderOptions.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>

    {formData.genderIdentity.includes('Other') && (
        <input
            type="text"
            placeholder="Please specify"
            value={formData.genderOther}
            onChange={(e) => handleInputChange('genderOther', e.target.value)}
            className="w-full border rounded px-3 py-2 mt-2"
        />
    )}

    {errors.genderIdentity && <div className="text-red-600 text-sm">{errors.genderIdentity}</div>}
</div>} */}


                    <div>
                        <label htmlFor="raceEthnicity" className="block font-medium">Race or Ethnicity *</label>
                        <select
                            id="raceEthnicity"
                            value={formData.raceEthnicity}
                            onChange={(e) => handleInputChange('raceEthnicity', e.target.value)}
                            className="w-full border rounded px-3 py-2"
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
                                className="w-full border rounded px-3 py-2 mt-2"
                            />
                        )}
                        {errors.raceEthnicity && <div className="text-red-600 text-sm">{errors.raceEthnicity}</div>}
                    </div>
                </div>

                {/* Academic Information */}
                <div className="bg-white border rounded p-4 space-y-4">
                    <h3 className="font-semibold">Academic Information</h3>
                    
                    <div>
                        <label htmlFor="levelOfStudy" className="block font-medium">Current Level of Study *</label>
                        <select
                            id="levelOfStudy"
                            value={formData.levelOfStudy}
                            onChange={(e) => handleInputChange('levelOfStudy', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="">Select level</option>
                            {studyLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                        {errors.levelOfStudy && <div className="text-red-600 text-sm">{errors.levelOfStudy}</div>}
                    </div>

                    {/*formData.levelOfStudy === 'Undergraduate' && (
                        <div>
                            <label htmlFor="yearLevel" className="block font-medium">Year Level *</label>
                            <select
                                id="yearLevel"
                                value={formData.yearLevel}
                                onChange={(e) => handleInputChange('yearLevel', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            >
                                <option value="">Select year</option>
                                {yearLevels.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            {errors.yearLevel && <div className="text-red-600 text-sm">{errors.yearLevel}</div>}
                        </div>
                    )*/}

                    {formData.levelOfStudy === 'Other' && (
                        <input
                            type="text"
                            placeholder="Please specify level of study"
                            value={formData.studyOther}
                            onChange={(e) => handleInputChange('studyOther', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    )}

                    <div>
                        <label htmlFor="fieldOfStudy" className="block font-medium">Field of Study *</label>
                        <select
                            id="fieldOfStudy"
                            value={formData.fieldOfStudy}
                            onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                            className="w-full border rounded px-3 py-2"
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
                                className="w-full border rounded px-3 py-2 mt-2"
                            />
                        )}
                        {errors.fieldOfStudy && <div className="text-red-600 text-sm">{errors.fieldOfStudy}</div>}
                    </div>

                    <div>
                        <label htmlFor="school" className="block font-medium">School *</label>
                        <select
                            id="school"
                            value={formData.school}
                            onChange={(e) => handleInputChange('school', e.target.value)}
                            className="w-full border rounded px-3 py-2"
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
                                className="w-full border rounded px-3 py-2 mt-2"
                            />
                        )}
                        {errors.school && <div className="text-red-600 text-sm">{errors.school}</div>}
                    </div>

                    {formData.school === 'Florida International University' && (
                        <div>
                            <label htmlFor="pantherID" className="block font-medium">Panther ID *</label>
                            <input
                                id="pantherID"
                                type="text"
                                value={formData.pantherID}
                                onChange={(e) => handleInputChange('pantherID', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                placeholder="7 digits"
                                maxLength={7}
                                required
                            />
                            <div className="text-sm text-gray-600">Must be 7 digits</div>
                            {errors.pantherID && <div className="text-red-600 text-sm">{errors.pantherID}</div>}
                        </div>
                    )}
                </div>

                {/* Social Profiles */}
                <div className="bg-white border rounded p-4 space-y-4">
                    <h3 className="font-semibold">Social Profiles (Optional)</h3>
                    
                    <div>
                        <label htmlFor="linkedin" className="block font-medium">LinkedIn</label>
                        <input
                            id="linkedin"
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>

                    <div>
                        <label htmlFor="github" className="block font-medium">GitHub Profile</label>
                        <input
                            id="github"
                            type="url"
                            value={formData.github}
                            onChange={(e) => handleInputChange('github', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="https://github.com/yourusername"
                        />
                    </div>

                    <div>
                        <label htmlFor="website" className="block font-medium">Personal Website</label>
                        <input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="https://yourwebsite.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="discord" className="block font-medium">Discord Username</label>
                        <input
                            id="discord"
                            type="text"
                            value={formData.discord}
                            onChange={(e) => handleInputChange('discord', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="username#1234"
                        />
                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white border rounded p-4 space-y-4">
                    <h3 className="font-semibold">Additional Information</h3>
                    
                    <div>
                        <label htmlFor="resume" className="block font-medium">Resume *</label>
                        <input
                            id="resume"
                            type="file"
                            onChange={handleFileChange}
                            className="w-full border rounded px-3 py-2"
                            accept=".pdf,.doc,.docx"
                            required
                        />
                        {errors.resume && <div className="text-red-600 text-sm">{errors.resume}</div>}
                    </div>

{/* <div>
    <label htmlFor="foodAllergies" className="block font-medium">Food Allergies/Restrictions (Optional)</label>
    <select
        id="foodAllergies"
        multiple
        value={formData.foodAllergies}
        onChange={(e) => {
            const options = Array.from(e.target.selectedOptions, option => option.value);
            handleInputChange('foodAllergies', options);
        }}
        className="w-full border rounded px-3 py-2"
    >
        {allergyOptions.map(allergy => (
            <option key={allergy} value={allergy}>{allergy}</option>
        ))}
    </select>
</div> */}


                    <div>
                        <label htmlFor="shirtSize" className="block font-medium">Shirt Size *</label>
                        <select
                            id="shirtSize"
                            value={formData.shirtSize}
                            onChange={(e) => handleInputChange('shirtSize', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="">Select size</option>
                            {shirtSizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                        {errors.shirtSize && <div className="text-red-600 text-sm">{errors.shirtSize}</div>}
                    </div>
                </div>

                {/* Agreements */}
                <div className="bg-white border rounded p-4 space-y-4">
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

