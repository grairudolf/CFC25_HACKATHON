import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'hsl(var(--background))' }}>
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case", // Example: Match existing button style from Navbar
            card: "shadow-xl rounded-lg", // Add shadow and rounded corners to the card
            headerTitle: "text-2xl font-semibold",
            headerSubtitle: "text-sm text-gray-600",
            socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
            footerActionText: "text-sm",
            footerActionLink: "text-blue-600 hover:text-blue-700 font-medium"
          }
        }}
      />
    </div>
  );
}
