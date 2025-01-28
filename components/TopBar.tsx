import { SignIn } from "./auth/signin-button";
import { SignOut } from "./auth/signout-button";
import UserAvatar from "./UserAvatar";

export function TopBar() {
    return <div className="bg-linear-to-r from-emerald-800 to-cyan-400 p-4 flex justify-between">
        <div className="text-white flex flex-col justify-center">
            Todo app
        </div>
        <div className="flex">
            <SignIn />
            <SignOut />
            <UserAvatar />
        </div>
    </div>
}