'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { FieldInput, PasswordInput } from './share/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()
  //
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  })
  //
  const onSuccess = useCallback(
    async (data: LoginFormValues) => {
      const result = await signIn('credentials', {
        redirect: false,
        name: data.name,
        password: data.password,
      })

      if (result?.error) {
        toast.error('Invalid name or password')
        return
      }

      toast.success('Logged in successfully')
      router.replace('/')
    },
    [router],
  )
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your name and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid w-full items-center gap-4"
            onSubmit={form.handleSubmit(onSuccess)}
          >
            <FieldGroup className="gap-4">
              <FieldInput
                name="name"
                controller={form.control}
                label="Name"
                placeholder="Enter name"
              />
              <PasswordInput
                name="password"
                placeholder="Enter password"
                controller={form.control}
                label="Password"
              />
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
