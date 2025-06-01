import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// YOU MUST REPLACE THIS WITH YOUR ACTUAL GOOGLE CLOUD CLIENT ID
const GOOGLE_CLIENT_ID = "594542956491-jg7btcblpi0t7joh898iblirg54atget.apps.googleusercontent.com";

declare global {
  interface Window {
    google?: {
      accounts?: {
        id: {
          initialize: (options: { client_id: string; callback: (response: any) => void }) => void;
          renderButton?: (parent: HTMLElement | null, options: object) => void;
          prompt: (callback?: (notification: any) => void) => void;
          disableAutoSelect: () => void;
          // Add other methods as needed
        };
        // Add other properties if needed
      };
    };
  }
}

interface User {
  name?: string;
  email: string;
  isGoogleAuth?: boolean;
  picture?: string; // For Google profile picture
}

interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => void; // For email/password
  signup: (user: User) => void; // For email/password
  logout: () => void;
  signInWithGoogle: () => void; // New function for Google Sign-In
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [googleAuthInitialized, setGoogleAuthInitialized] = useState(false);

  useEffect(() => {
    if (window.google && window.google.accounts && !googleAuthInitialized) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLoginResponse, // This function will handle the response from Google
      });
      setGoogleAuthInitialized(true);
      // Optionally, render the Google button here if you're using the new button
      // window.google.accounts.id.renderButton(
      //   document.getElementById("googleSignInButton"), // Ensure this element exists if you use it
      //   { theme: "outline", size: "large" } 
      // );
      // window.google.accounts.id.prompt(); // Display the One Tap prompt
    }
  }, [googleAuthInitialized]); // Rerun when googleAuthInitialized changes

  const handleGoogleLoginResponse = (response: any) => {
    // The response object contains the credential (JWT ID token)
    console.log("Received Google ID token:", response.credential);
    // In a real app, you would send this token to your backend for verification
    // and to create a session or retrieve user data.
    // For client-side only demo, we can decode it (not recommended for production without backend verification)
    // or simply use it to signify login.

    // Basic decoding of JWT (not for production without a library and verification)
    try {
      const idToken = response.credential;
      const base64Url = idToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decodedToken = JSON.parse(jsonPayload);
      console.log("Decoded Google Token:", decodedToken);

      setCurrentUser({
        name: decodedToken.name,
        email: decodedToken.email,
        picture: decodedToken.picture,
        isGoogleAuth: true,
      });
      // Potentially navigate to home page or dashboard
      // navigate("/"); // Make sure navigate is available here or handle navigation in the component
    } catch (error) {
      console.error("Error decoding Google token or setting user:", error);
    }
  };

  const login = (user: User) => {
    console.log("Simulating email/password login for:", user.email);
    setCurrentUser(user);
  };

  const signup = (user: User) => {
    console.log("Simulating email/password signup for:", user.email);
    setCurrentUser(user);
  };

  const logout = () => {
    console.log("Simulating logout");
    if (currentUser?.isGoogleAuth && window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
      // Potentially call window.google.accounts.id.revoke() if needed,
      // but this might require more complex handling if the user is signed into multiple Google apps.
    }
    setCurrentUser(null);
  };

  const signInWithGoogle = () => {
    if (googleAuthInitialized && window.google && window.google.accounts) {
      // This triggers the Google One Tap or a popup if One Tap is disabled/not chosen.
      // For a button click, it's often better to use the popup flow directly.
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // This can happen if One Tap is blocked by browser settings or user chose not to use it.
          // Fallback to popup or other UX. For now, log it.
          console.warn("Google One Tap prompt was not displayed or was skipped.");
          // As a fallback or primary method for button clicks:
          // Consider using `window.google.accounts.oauth2.initTokenClient` for a more explicit popup flow.
          // This part requires more setup for the OAuth2 token client.
          // For simplicity with the Identity Services SDK's ID tokens:
          // If prompt() doesn't work as expected for a button, you might need to ensure
          // the Google button is rendered using google.accounts.id.renderButton
          // and let it handle its own click, or explore the more complex OAuth2 flow.
        }
      });
    } else {
      console.error("Google Auth not initialized or google object not available.");
      // You might want to try initializing again or show an error to the user.
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
