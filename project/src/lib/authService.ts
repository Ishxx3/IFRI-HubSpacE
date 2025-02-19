interface Student {
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  year: number;
}

const STUDENTS: Student[] = [
  {
    matricule: "10074423",
    firstName: "Ishack",
    lastName: "BOURAIMA",
    email: "landrystn3@gmail.com",
    phone: "+229 91374484",
    program: "Sécurité informatique",
    year: 3
  },
  {
    matricule: "10048425",
    firstName: "Héloïse",
    lastName: "AKOHOU",
    email: "ak.heloise2007@gmail.com",
    phone: "+22964230332",
    program: "Génie logiciel",
    year: 1
  },
  {
    matricule: "11618825",
    firstName: "Esteve",
    lastName: "QUENUM",
    email: "estevequenum20@gmail.com",
    phone: "+22997092578",
    program: "Génie Logiciel",
    year: 1
  },
  {
    matricule: "11929525",
    firstName: "Mirabelle",
    lastName: "KANGNIDE",
    email: "mirabellekangnide10@gmail.com",
    phone: "+229 59684269",
    program: "Sécurité informatique",
    year: 1
  }
];

interface User {
  matricule: string;
  email: string;
  password: string;
}

// État global pour l'utilisateur connecté
let currentUser: Student | null = null;

// Simuler une base de données d'utilisateurs
let users: User[] = [];

// Charger les utilisateurs du localStorage
const loadUsers = () => {
  const savedUsers = localStorage.getItem('users');
  if (savedUsers) {
    users = JSON.parse(savedUsers);
  }
};

// Sauvegarder les utilisateurs dans le localStorage
const saveUsers = () => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Vérifier si un étudiant existe et retourner ses informations
export const verifyStudent = (matricule: string) => {
  const student = STUDENTS.find(student => student.matricule === matricule);
  if (!student) return null;
  return student;
};

// Vérifier si un email correspond à l'étudiant
const verifyStudentEmail = (matricule: string, email: string) => {
  const student = STUDENTS.find(s => s.matricule === matricule);
  return student?.email === email;
};

// Inscription
export const signUp = (matricule: string, email: string, password: string) => {
  loadUsers();
  
  // Vérifier si l'étudiant existe
  const student = verifyStudent(matricule);
  if (!student) {
    throw new Error("Matricule non reconnu");
  }

  // Vérifier si l'email correspond à l'étudiant
  if (!verifyStudentEmail(matricule, email)) {
    throw new Error("L'email ne correspond pas à cet étudiant");
  }

  // Vérifier si l'étudiant est déjà inscrit
  if (users.some(u => u.matricule === matricule)) {
    throw new Error("Cet étudiant est déjà inscrit");
  }

  // Créer le nouvel utilisateur
  const newUser: User = { matricule, email, password };
  users.push(newUser);
  saveUsers();

  currentUser = student;
  return student;
};

// Connexion
export const signIn = (email: string, password: string) => {
  loadUsers();
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const student = verifyStudent(user.matricule);
  if (!student) {
    throw new Error("Étudiant non trouvé");
  }

  currentUser = student;
  return student;
};

// Obtenir l'utilisateur courant
export const getCurrentUser = () => {
  return currentUser;
};

// Déconnexion
export const signOut = () => {
  currentUser = null;
};

// Réinitialisation du mot de passe
export const resetPassword = (email: string) => {
  loadUsers();
  
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error("Email non trouvé");
  }

  // Vérifier si l'email correspond à un étudiant
  const student = STUDENTS.find(s => s.email === email);
  if (!student) {
    throw new Error("Cet email ne correspond à aucun étudiant");
  }

  // Simuler l'envoi d'un email
  console.log(`Un email de réinitialisation a été envoyé à ${email}`);
  return true;
};