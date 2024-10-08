import { Card } from '@/app/components/ui'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { getAvailability } from '@/app/lib/function'
import { requireUser } from '@/app/lib/hooks'
import React from 'react'

const Availablity = async () => {
  const session = await requireUser();
  const data = await getAvailability(session.user?.id as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avaliability</CardTitle>
        <CardDescription>In this section you can your availablity</CardDescription>
      </CardHeader>
      <form action="">
        <CardContent>
          {
            data.map((item, index: number) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
                key={index}
              >
                  
              </div>
            ))
          }
        </CardContent>
      </form>
    </Card>
  )
}

export default Availablity