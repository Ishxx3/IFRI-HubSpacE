export interface Student {
  id: string;
  matricule: string;
  email: string;
  name: string;
  program: 'Internet et Multimedia' | 'Genie Logiciel' | 'Systemes Embarques' | 'Securite Informatique' | 'SIRI';
  year: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'conference' | 'hackathon' | 'workshop' | 'alumni';
  image: string;
  status: 'past' | 'current' | 'upcoming';
}

export interface Document {
  id: string;
  title: string;
  type: 'certificate' | 'transcript' | 'attestation';
  status: 'pending' | 'ready' | 'delivered';
  requestDate: string;
  deliveryDate?: string;
}

export interface Course {
  id: string;
  title: string;
  program: Student['program'];
  year: number;
  type: 'course' | 'exam';
  subject: string;
  uploadDate: string;
  downloadUrl: string;
}

export interface Schedule {
  id: string;
  program: Student['program'];
  year: number;
  weekNumber: number;
  days: {
    day: string;
    courses: {
      startTime: string;
      endTime: string;
      subject: string;
      professor: string;
      room: string;
    }[];
  }[];
}