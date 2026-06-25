import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/eco-hub/blogs/$blogsId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/eco-hub/blogs/$blogsId"!</div>
}
