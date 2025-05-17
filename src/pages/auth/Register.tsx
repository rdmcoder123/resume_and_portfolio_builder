import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>();

  useEffect(() => {
    document.title = 'Sign Up - Resumify';
  }, []);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signUp(data.email, data.password, data.name);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-muted/30 py-12">
      <div className="container flex flex-col items-center">
        <motion.div 
          className="mx-auto max-w-md w-full space-y-6 p-8 bg-background rounded-lg shadow-md border border-border"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {success ? (
            <div className="text-center space-y-4">
              <div className="bg-success/20 text-success-foreground p-4 rounded-md inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Registration successful!</h2>
              <p className="text-muted-foreground">
                Your account has been created. You can now sign in.
              </p>
              <div className="pt-4">
                <Link to="/login" className="btn btn-primary">
                  Continue to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground mt-2">Sign up to get started with Resumify</p>
              </div>
              
              {error && (
                <div className="bg-error text-error-foreground p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`input w-full ${errors.name ? 'border-error-foreground' : ''}`}
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                  />
                  {errors.name && (
                    <p className="text-error-foreground text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`input w-full ${errors.email ? 'border-error-foreground' : ''}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-error-foreground text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className={`input w-full pr-10 ${errors.password ? 'border-error-foreground' : ''}`}
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-error-foreground text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 rounded border-input"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary-foreground hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary-foreground hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}
                  Create Account
                </button>
              </form>
              
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-foreground hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}