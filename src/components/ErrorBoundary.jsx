import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F4F0] flex items-center
          justify-center p-6">
          <div className="bg-white rounded-2xl border 
            border-[#E5E0D8] p-8 max-w-md w-full text-center">
            <div className="w-10 h-10 bg-[#C0392B]/10 rounded-xl 
              flex items-center justify-center mx-auto mb-4">
              <div className="w-3 h-3 bg-[#C0392B] rounded-full"/>
            </div>
            <p className="text-[10px] font-bold text-[#9A9590]
              font-['Space_Mono'] uppercase tracking-widest mb-2">
              Something broke
            </p>
            <p className="text-sm text-[#1A1A2E] font-['Inter'] mb-4">
              {this.state.error?.message || 'Unexpected error'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-[10px] font-bold text-[#E07B39]
                font-['Space_Mono'] uppercase tracking-wider
                hover:underline"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
