import { SignUp } from "@clerk/clerk-react";

export default function SignupPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'hsl(var(--background))' }}>
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/login"
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
            card: "shadow-xl rounded-lg",
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
