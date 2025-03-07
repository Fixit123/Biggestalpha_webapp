"use client"

import { Component, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

class ErrorBoundary extends Component<Props> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh.</div>
    }
    return this.props.children
  }
}

export default ErrorBoundary 