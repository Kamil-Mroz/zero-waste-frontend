import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/users/$userId/items')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/users/$useriId/items"!</div>
}
