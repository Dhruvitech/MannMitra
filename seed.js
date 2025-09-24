const mongoose = require('mongoose');
const Counselor = require('./model/counselor'); 
const Resource = require('./model/resource');  

// Replace with your MongoDB connection string
mongoose.connect('mongodb://localhost:27017/mannmitra')
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.error('Connection error:', err));

const counselors = [
    {
        name: 'Dr. Priya Sharma',
        specialization: 'Anxiety and Depression',
        bio: 'Dr. Sharma is a licensed clinical psychologist with over 10 years of experience in student mental health.',
        profilePic: 'https://images.unsplash.com/photo-1544717305-b9982736480b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Mr. Rohan Kumar',
        specialization: 'Stress Management',
        bio: 'Mr. Kumar is a certified counselor focusing on academic and personal stress.',
        profilePic: 'https://images.unsplash.com/photo-1616409890130-7460e0a9695b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Ms. Kavita Singh',
        specialization: 'Mindfulness and Relaxation',
        bio: 'Ms. Singh helps students develop healthy coping mechanisms and mindfulness practices.',
        profilePic: 'https://images.unsplash.com/photo-1579612081518-e36605342a27?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Ms. Ritu Patel',
        specialization: 'Academic Stress and Time Management',
        bio: 'Ms. Patel specializes in helping students navigate the pressures of academics and develop effective study habits.',
        profilePic: 'https://images.unsplash.com/photo-1582210871279-307963d3950c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Mr. Vivek Singh',
        specialization: 'Relationship and Family Issues',
        bio: 'Mr. Singh provides a safe space for students to discuss personal relationships and family conflicts.',
        profilePic: 'https://images.unsplash.com/photo-1594744803329-e58f31fd59a3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Dr. Anjali Verma',
        specialization: 'Trauma and PTSD',
        bio: 'Dr. Verma is a compassionate therapist with a focus on trauma-informed care and recovery.',
        profilePic: 'https://images.unsplash.com/photo-1579612081518-e36605342a27?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];

const resources = [
    {
        title: '5 Ways to Manage Student Stress',
        description: 'Practical strategies from Prospects for handling academic pressure and university life.',
        type: 'article',
        url: 'https://www.prospects.ac.uk/applying-for-university/university-life/5-ways-to-manage-student-stress',
        duration: '7 min read'
    },
    
    {
        title: 'stress relief',
        description: 'Techniques and exercises to help manage and reduce stress effectively.',
        type: 'video',
        url: 'https://www.youtube.com/embed/XhRm175H6is', // <--- Use this embed URL
        duration: '2 min video'
    },
    {
        title: 'Stress Management Guide',
        description: 'A comprehensive guide with various techniques and worksheets to help manage stress effectively.',
        type: 'article',
        url: 'https://www.therapistaid.com/therapy-guide/stress-management-guide',
        duration: '10 min read'
    },
    {
        title: 'Your Audio Title Here',
        description: 'A brief description of this audio file.',
        type: 'audio',
        url: 'https://drive.google.com/uc?export=download&id=1eucLhrVRBT7FCTzdbpns7MCLb4PILK0t',
        duration: 'X min audio'
    },
    
    {
        title: 'Your Audio Title',
        description: 'A brief description of your audio.',
        type: 'audio',
        url: 'https://drive.google.com/uc?export=download&id=1wAIv7C9qdfvQrHlybtV9bbqkdIZTQXI1', // <-- Use the direct download URL
        duration: 'X min audio'
    },
    {
        title: 'Top School Stress Relievers for Students',
        description: 'An article from Verywell Mind with effective and simple ways for students to manage stress.',
        type: 'article',
        url: 'https://www.verywellmind.com/top-school-stress-relievers-for-students-3145179',
        duration: '5 min read'
    },
    {
        title: 'Mindfulness for Stress and Anxiety',
        description: 'A guided mindfulness practice to help reduce stress and anxiety in daily life.',
        type: 'video',
        url: 'https://www.youtube.com/embed/MIr3RsUWrdo',
        duration: '10 min video'
    },
];

const seedDB = async () => {
    try {
        await Counselor.deleteMany({});
        console.log('Existing counselors cleared.');
        await Counselor.insertMany(counselors);
        console.log('Counselor data added successfully!');

        await Resource.deleteMany({});
        console.log('Existing resources cleared.');
        await Resource.insertMany(resources);
        console.log('Resource data added successfully!');

    } catch (err) {
        console.error('Error seeding the database:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();