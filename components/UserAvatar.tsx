import { auth } from "../auth"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
      <img src={session?.user?.image ?? "/UserAvatar.png"} alt="User Avatar" className="w-10 h-10 ml-2 rounded-full drop-shadow-xl"/>
    </div>
  )
}