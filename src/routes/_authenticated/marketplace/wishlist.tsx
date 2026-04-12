import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/marketplace/wishlist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/marketplace/wishlist"!</div>
}
