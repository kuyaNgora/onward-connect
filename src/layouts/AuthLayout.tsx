import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-mesh relative overflow-hidden">
      {/* Floating orbs */}
      <div className="orb orb-primary w-96 h-96 -top-48 -left-48 animate-float-slow" style={{ animationDelay: '0s' }} />
      <div className="orb orb-accent w-72 h-72 -bottom-36 -right-36 animate-float-slow" style={{ animationDelay: '3s' }} />
      <div className="orb orb-primary w-48 h-48 top-1/4 right-1/4 animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="w-full max-w-md p-6 relative z-10">
        <Outlet />
      </div>
    </div>
  )
}
