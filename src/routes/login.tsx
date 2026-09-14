import { AuthStatus } from "#/components/AuthStatus";
import { LoginForm } from "#/components/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  headers: () => ({ 'Cache-Control': "private, no-store" }),
})


function RouteComponent() {
  return <div className="w-screen h-screen flex justify-center items-center">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>
          Fill in your detes and let's get you leaking data in no time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthStatus />
      </CardContent>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  </div>
    ;
}
