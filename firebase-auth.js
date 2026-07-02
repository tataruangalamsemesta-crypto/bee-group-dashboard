// Firebase Authentication Module
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  database,
  ref,
  set,
  get,
  update
} from './firebase-config.js';

let currentUser = null;

// Check if user is logged in on page load
export function initAuth() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('authToken', user.uid);
      console.log('User logged in:', user.email);
      
      // Hide login page, show dashboard
      const loginContainer = document.getElementById('loginContainer');
      const dashboardContainer = document.getElementById('dashboardContainer');
      if (loginContainer) loginContainer.style.display = 'none';
      if (dashboardContainer) dashboardContainer.style.display = 'block';
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: user }));
    } else {
      currentUser = null;
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      sessionStorage.removeItem('authToken');
      console.log('User logged out');
      
      // Show login page, hide dashboard
      const loginContainer = document.getElementById('loginContainer');
      const dashboardContainer = document.getElementById('dashboardContainer');
      if (loginContainer) loginContainer.style.display = 'block';
      if (dashboardContainer) dashboardContainer.style.display = 'none';
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
    }
  });
}

// Register new user
export async function registerUser(email, password, fullName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user profile to database
    await set(ref(database, 'users/' + user.uid), {
      email: email,
      fullName: fullName,
      createdAt: new Date().toISOString(),
      role: 'user'
    });
    
    console.log('User registered:', user.email);
    return { success: true, user: user };
  } catch (error) {
    console.error('Registration error:', error.message);
    return { success: false, error: error.message };
  }
}

// Login user
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, error: error.message };
  }
}

// Logout user
export async function logoutUser() {
  try {
    await signOut(auth);
    console.log('User logged out');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error.message);
    return { success: false, error: error.message };
  }
}

// Get current user
export function getCurrentUser() {
  return currentUser;
}

// Get user ID
export function getUserId() {
  return currentUser?.uid || localStorage.getItem('userId');
}

// Get user email
export function getUserEmail() {
  return currentUser?.email || localStorage.getItem('userEmail');
}

// Check if user is authenticated
export function isUserAuthenticated() {
  return currentUser !== null || sessionStorage.getItem('authToken') !== null;
}