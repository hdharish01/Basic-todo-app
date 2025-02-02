import { SignIn } from "./auth/signin-button";
import { SignOut } from "./auth/signout-button";
import UserAvatar from "./UserAvatar";

export function TopBar() {
    return <div className="bg-gradient-to-r from-teal-200 to-slate-300 pt-4">
        <div className="bg-gradient-to-br mx-4 rounded-full from-emerald-800 to-slate-400 p-4 flex justify-between">
            <div className="text-white flex flex-col justify-center">
                Todo app
            </div>
            <div className="flex">
                <SignIn />
                <SignOut />
                <UserAvatar />
            </div>
        </div>
    </div>
}