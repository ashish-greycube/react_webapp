import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFrappeAuth } from "frappe-react-sdk";
import { useState } from "react";

const Login = () => {
  const { login, logout , currentUser } = useFrappeAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login({
      username: email,
      password: password,
    });
  };

  return (
    <div className=" flex w-screen h-screen items-center justify-center ">
      {currentUser ? (
          <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Hello Welcome To GreyCube</CardTitle>
            <CardDescription>
              Logged in as {currentUser}
            </CardDescription>
            <CardAction>
              <Button variant="destructive" onClick={logout}>LogOut</Button>
            </CardAction>
          </CardHeader> 
          </Card>
      ) : (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Hello Welcome To GreyCube</CardTitle>
            <CardDescription>
              Login With Cradantials Or Register
            </CardDescription>
            <CardAction>
              <Button variant="link" >Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="outline" className="w-full" >
              Login with Frappe
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Login;
