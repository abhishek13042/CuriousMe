import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Sidebar from './components/Sidebar'
import ErrorBoundary from './components/ErrorBoundary'
import JarvisToast from './components/JarvisToast'

const AIBatch  = lazy(() => import('./pages/AIBatch'))
const MyBatch  = lazy(() => import('./pages/MyBatch'))
const Explorer = lazy(() => import('./pages/Explorer'))

const Loading = () => (
  <div className="flex-1 flex items-center justify-center
    min-h-screen">
    <div className="text-center">
      <div className="w-6 h-6 border-2 border-[#E07B39]
        border-t-transparent rounded-full animate-spin mx-auto mb-3"/>
      <p className="text-[10px] text-[#9A9590] font-['Space_Mono']
        uppercase tracking-widest">
        Loading...
      </p>
    </div>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#F5F4F0]">
        <Sidebar/>
        <main className="flex-1 min-w-0 lg:overflow-auto
          pt-14 lg:pt-0">
          <ErrorBoundary>
            <Suspense fallback={<Loading/>}>
              <Routes>
                <Route path="/" element={<Navigate to="/batch" replace/>}/>
                <Route path="/batch" element={
                  <ErrorBoundary><AIBatch/></ErrorBoundary>
                }/>
                <Route path="/mybatch" element={
                  <ErrorBoundary><MyBatch/></ErrorBoundary>
                }/>
                <Route path="/explorer" element={
                  <ErrorBoundary><Explorer/></ErrorBoundary>
                }/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <JarvisToast />
      </div>
    </BrowserRouter>
  )
}
