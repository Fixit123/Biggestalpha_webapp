export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    </div>
  )
} 