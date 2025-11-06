#attendees/models.py
from django.db import models
from django.contrib.postgres.fields import ArrayField

class Attendee(models.Model):
    # Basic info
    #id = models.CharField(max_length=255, unique=True) # to link with auth system
    first_name  = models.CharField(max_length=100)
    last_name   = models.CharField(max_length=100)
    email       = models.EmailField(unique=True)
    password    = models.CharField(max_length=128, blank=True)

    # Demographics
    date_of_birth = models.DateField(blank=True, null=True)

    COUNTRIES = [
        ('Prefer not to answer', 'Prefer not to answer'),
        ('United States', 'United States'),
        ('Canada', 'Canada'),
        ('Mexico', 'Mexico'),
        ('Brazil', 'Brazil'),
        ('United Kingdom', 'United Kingdom'),
        ('Germany', 'Germany'),
        ('France', 'France'),
        ('Spain', 'Spain'),
        ('Italy', 'Italy'),
        ('China', 'China'),
        ('Japan', 'Japan'),
        ('India', 'India'),
        ('Australia', 'Australia'),
        ('Other', 'Other'),
    ]
    country = models.CharField(max_length=50, choices=COUNTRIES, blank=True)

    US_STATES = [
        ('Prefer not to answer', 'Prefer not to answer'),
        ('Alabama', 'Alabama'), ('Alaska', 'Alaska'), ('Arizona', 'Arizona'), ('Arkansas', 'Arkansas'),
        ('California', 'California'), ('Colorado', 'Colorado'), ('Connecticut', 'Connecticut'),
        ('Delaware', 'Delaware'), ('Florida', 'Florida'), ('Georgia', 'Georgia'), ('Hawaii', 'Hawaii'),
        ('Idaho', 'Idaho'), ('Illinois', 'Illinois'), ('Indiana', 'Indiana'), ('Iowa', 'Iowa'),
        ('Kansas', 'Kansas'), ('Kentucky', 'Kentucky'), ('Louisiana', 'Louisiana'), ('Maine', 'Maine'),
        ('Maryland', 'Maryland'), ('Massachusetts', 'Massachusetts'), ('Michigan', 'Michigan'),
        ('Minnesota', 'Minnesota'), ('Mississippi', 'Mississippi'), ('Missouri', 'Missouri'),
        ('Montana', 'Montana'), ('Nebraska', 'Nebraska'), ('Nevada', 'Nevada'), ('New Hampshire', 'New Hampshire'),
        ('New Jersey', 'New Jersey'), ('New Mexico', 'New Mexico'), ('New York', 'New York'),
        ('North Carolina', 'North Carolina'), ('North Dakota', 'North Dakota'), ('Ohio', 'Ohio'),
        ('Oklahoma', 'Oklahoma'), ('Oregon', 'Oregon'), ('Pennsylvania', 'Pennsylvania'),
        ('Rhode Island', 'Rhode Island'), ('South Carolina', 'South Carolina'), ('South Dakota', 'South Dakota'),
        ('Tennessee', 'Tennessee'), ('Texas', 'Texas'), ('Utah', 'Utah'), ('Vermont', 'Vermont'),
        ('Virginia', 'Virginia'), ('Washington', 'Washington'), ('West Virginia', 'West Virginia'),
        ('Wisconsin', 'Wisconsin'), ('Wyoming', 'Wyoming'),
    ]
    state = models.CharField(max_length=50, choices=US_STATES, blank=True)

    GENDER_OPTIONS = [
        ('Woman', 'Woman'),
        ('Man', 'Man'),
        ('Non-binary or Transgender', 'Non-binary or Transgender'),
        ('Other', 'Other'),
        ('Prefer not to answer', 'Prefer not to answer')
    ]
    gender_identity = models.CharField(max_length=50, choices=GENDER_OPTIONS, blank=True)
    gender_other = models.CharField(max_length=100, blank=True)

    RACE_OPTIONS = [
        ('White', 'White'),
        ('Hispanic or Latine', 'Hispanic or Latine'),
        ('Black or African American', 'Black or African American'),
        ('Asian', 'Asian'),
        ('Native American or Alaskan Native', 'Native American or Alaskan Native'),
        ('Native Hawaiian or Other Pacific Islander', 'Native Hawaiian or Other Pacific Islander'),
        ('Middle Eastern', 'Middle Eastern'),
        ('Other', 'Other'),
        ('Prefer not to answer', 'Prefer not to answer'),
    ]
    race_ethnicity = models.CharField(max_length=50, choices=RACE_OPTIONS, blank=True)
    race_other = models.CharField(max_length=100, blank=True)

    # Academic info
    LEVELS_OF_STUDY = [
        ('Undergraduate', 'Undergraduate'),
        ('Graduate', 'Graduate'),
        ('Post-Doctorate', 'Post-Doctorate'),
        ('Other', 'Other'),
        ("I'm not a student", "I'm not a student"),
        ('Prefer not to answer', 'Prefer not to answer')
    ]
    level_of_study = models.CharField(max_length=50, choices=LEVELS_OF_STUDY, blank=True)

    YEAR_LEVELS = [
        ('Freshman', 'Freshman'),
        ('Sophomore', 'Sophomore'),
        ('Junior', 'Junior'),
        ('Senior', 'Senior'),
        ('Prefer not to answer', 'Prefer not to answer')
    ]
    year_level = models.CharField(max_length=50, choices=YEAR_LEVELS, blank=True)

    study_other = models.CharField(max_length=100, blank=True)

    FIELDS_OF_STUDY = [
        ('Computer Science', 'Computer Science'),
        ('Information Technology', 'Information Technology'),
        ('Software Engineering', 'Software Engineering'),
        ('Computer Engineering', 'Computer Engineering'),
        ('Data Science', 'Data Science'),
        ('Cybersecurity', 'Cybersecurity'),
        ('Information Systems', 'Information Systems'),
        ('Web Development', 'Web Development'),
        ('Game Development', 'Game Development'),
        ('Business', 'Business'),
        ('Engineering', 'Engineering'),
        ('Mathematics', 'Mathematics'),
        ('Biology', 'Biology'),
        ('Chemistry', 'Chemistry'),
        ('Physics', 'Physics'),
        ('Psychology', 'Psychology'),
        ('Other', 'Other')
    ]
    field_of_study = models.CharField(max_length=255, choices=FIELDS_OF_STUDY, blank=True)
    field_other = models.CharField(max_length=100, blank=True)

    SCHOOLS = [
        ('Florida International University','Florida International University'),
        ('University of Florida','University of Florida'),
        ('Florida State University','Florida State University'),
        ('University of Central Florida','University of Central Florida'),
        ('Florida Institute of Technology','Florida Institute of Technology'),
        ('Nova Southeastern University','Nova Southeastern University'),
        ('Florida Atlantic University','Florida Atlantic University'),
        ('University of South Florida','University of South Florida'),
        ('Florida A&M University','Florida A&M University'),
        ('Florida Polytechnic University','Florida Polytechnic University'),
        ('Harvard University','Harvard University'),
        ('MIT','MIT'),
        ('Stanford University','Stanford University'),
        ('UC Berkeley','UC Berkeley'),
        ('Georgia Tech','Georgia Tech'),
        ('Carnegie Mellon','Carnegie Mellon'),
        ('Other','Other')
    ]
    school = models.CharField(max_length=255, choices=SCHOOLS, blank=True)
    school_other = models.CharField(max_length=100, blank=True)
    panther_id = models.CharField(max_length=50, blank=True)

    # Social
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    website = models.URLField(blank=True)
    discord = models.CharField(max_length=100, blank=True)

    # Additional info
    ALLERGIES = [
        ('Milk', 'Milk'), ('Eggs', 'Eggs'), ('Fish', 'Fish'), ('Crustacean shellfish', 'Crustacean shellfish'),
        ('Peanuts', 'Peanuts'), ('Tree nuts', 'Tree nuts'), ('Wheat', 'Wheat'), ('Soybeans', 'Soybeans'), 
        ('Sesame', 'Sesame')
    ]
    # food_allergies = models.JSONField(default=list, blank=True)
    food_allergies = ArrayField(
        models.CharField(max_length=50),
        blank=True,
        default=list
    )
    custom_allergy = models.CharField(max_length=100, blank=True)

    SHIRT_SIZES = [
        ('S','S'), ('M','M'), ('L','L'), ('XL','XL')
    ]
    shirt_size = models.CharField(max_length=5, choices=SHIRT_SIZES, blank=True)

    # Agreements
    code_of_conduct = models.BooleanField(default=False)
    photography_consent = models.BooleanField(default=False)

    # Files and tracking
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    checked_in = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Future feature: profile image
    profileImage = models.CharField(max_length=100, blank=True, null=True)
    

    def __str__(self):
        return f"{self.first_name} {self.last_name} <{self.email}>"

