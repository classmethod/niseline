import React from 'react'

export const App: React.VFC<{}> = () => {
  const [user, setUser] = React.useState<{
    id: string
    name: string
    picture: string
  }>()

  React.useEffect(() => {
    window.liff.getProfile().then((profile) =>
      setUser({
        id: profile.userId,
        name: profile.displayName,
        picture: profile.pictureUrl!,
      })
    )
  })

  if (user == null) {
    return <>Loading...</>
  }

  return (
    <>
      <div className="flex justify-center p-4">
        <div className="flex items-stretch p-2 max-w-md rounded border-2 border-slate-700">
          <img
            src={user.picture}
            className="h-20 rounded-full"
            width={50.8}
            height={80}
            onError={(e) => {
              ;(e.target as any).src = '/img/user-icon.png'
            }}
          />
          <div className="flex items-center ml-4">
            <div>
              <div>id: {user.id}</div>
              <div>name: {user.name}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
