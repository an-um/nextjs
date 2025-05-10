export default function UserProfile({params}: any) {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Profile page</h1>
            <h3>Email with id:
                <span className="mx-2 p-1 bg-green-300 text-lg"> {params.id} </span>
            </h3>
        </div>
    )
}