import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_layout/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/register"!</div>
}
