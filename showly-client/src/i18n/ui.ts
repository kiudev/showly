import { LanguageTypes } from "@/types/languages"

export const languages: LanguageTypes = {
  en: {
    name: 'English',
    flagCode: 'gb'
  },
  es: {
    name: 'Español',
    flagCode: 'es'
  },
}

export const defaultLng = "es"

export const ui = {
  en: {
        translation: {
          welcome: "Stay tuned with your favorites TV series",
          description:
            "A platform for your personal media library.",
          signUpBtn: "Sign Up",
          signInBtn: "Sign In",
          signInBtnWithGoogle: "Continue with Google",
          signUpTitle: "Sign up to Showly",
          signUpSubtitle: "Create an account to enjoy all the features of Showly.",
          signEmail: "Email",
          signPassword: "Password",
          signUpPasswordConfirmation: "Password Confirmation",
          signUpUsername: 'Username',
          signEmailPlaceholder: "johndoe@gmail.com",
          signPasswordPlaceholder: "Type your password",
          signUpPasswordConfirmationPlaceholder: "Type your password confirmation",
          signUpUsernamePlaceholder: 'John Doe',
          signInTitle: 'Sign in to Showly',
          signInSubtitle: 'Sign in with your account to enjoy all the features of Showly.',
          toastSignOutTitle: "User has been signed out successfully",
          toastSignOutDescription: "We hope to see you again soon! 👋",
          toastSignInLoading: "Signing in...",
          toastSignIn: "You have been sign in successfully!",
          toastSignInError: "Failed to sign in"
        },
      },
      es: {
        translation: {
          welcome: "Mantente al tanto de tus series favoritas",
          description:
            "Una plataforma para tu biblioteca personal.",
          signUpBtn: "Regístrate",
          signInBtn: "Iniciar sesión",
          signInBtnWithGoogle: "Continuar con Google",
          signUpTitle: "Regístrate en Showly",
          signUpSubtitle: "Crea una cuenta para disfrutar de todas las ventajas de Showly",
          signEmail: "Correo Electrónico",
          signPassword: "Contraseña",
          signUpPasswordConfirmation: "Confirmación de contraseña",
          signUpUsername: 'Nombre de usuario',
          signEmailPlaceholder: "juanperez@gmail.com",
          signPasswordPlaceholder: "Escribe tu contraseña",
          signUpPasswordConfirmationPlaceholder: "Escribe la confirmación de tu contraseña",
          signUpUsernamePlaceholder: 'Juan Pérez',
          signInTitle: 'Inicia sesión a Showly',
          signInSubtitle: 'Inicia sesión con tu cuenta para disfrutar de todas las ventajas de Showly.',
          toastSignOutTitle: "Has cerrado sesión correctamente",
          toastSignOutDescription: "¡Espero verte de vuelta! 👋",
          toastSignInLoading: "Iniciando sesión...",
          toastSignIn: "¡Has iniciado sesión correctamente!",
          toastSignInError: "Ha habido un error al iniciar sesión"
        },
      },
}
