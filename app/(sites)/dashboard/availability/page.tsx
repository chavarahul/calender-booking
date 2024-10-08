import { updateAvailability } from '@/app/actions'
import SubmitButton from '@/app/components/auth/SubmitButton'
import { Card, Select, Switch } from '@/app/components/ui'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { getAvailability } from '@/app/lib/function'
import { requireUser } from '@/app/lib/hooks'
import { times } from '@/app/lib/times'
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
      <form action={updateAvailability}>
        <CardContent className='flex flex-col gap-y-4'>
          {
            data.map((item, index: number) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
                key={index}
              >
                <input
                  type="hidden"
                  name={`id-${item.id}`}
                  value={item.id}
                />
                <div className="flex items-center gap-x-3">
                  <Switch
                    defaultChecked={item.isActive}
                    name={`isActive-${item.id}`}
                  />
                  <p>{item.day}</p>
                </div>
                <Select
                  defaultValue={item.fromTime}
                  name={`fromTime-${item.id}`}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='From Time' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem value={time.time} key={time.id}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  defaultValue={item.tillTime}
                  name={`tillTime-${item.id}`}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Till Time' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem value={time.time} key={time.id}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ))
          }
        </CardContent>
        <CardFooter>
          <SubmitButton text='Save Changes' variant={"default"} />
        </CardFooter>
      </form>
    </Card>
  )
}

export default Availablity