import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/marketplace/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/marketplace/history"!</div>
}
