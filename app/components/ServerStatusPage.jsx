import { cookies } from 'next/headers'

import StatusPage from 'components/StatusPage';

export default function ServerComponent() {
  const cookie = cookies().get('user')?.value
  return (
    <div>
      <StatusPage initial={cookie} />
    </div>      
  )
}