'use client'
import type { ComponentProps } from 'react'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Field, FieldLabel, FieldDescription, FieldError } from '../ui/field'
import { Input } from '../ui/input'
import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { EyeOffIcon, EyeIcon } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface TextInputProps<TFieldValues extends FieldValues> extends Omit<
  ComponentProps<typeof Textarea>,
  'name'
> {
  name: Path<TFieldValues>
  controller: Control<TFieldValues>
  label: string
  description?: string
}

interface InputProps<TFieldValues extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  'name'
> {
  name: Path<TFieldValues>
  controller: Control<TFieldValues>
  label: string
  description?: string
}

interface SelectOption {
  value: string
  label: string
}
interface SelectInputProps<TFieldValues extends FieldValues> extends Omit<
  ComponentProps<typeof Select>,
  'name'
> {
  name: Path<TFieldValues>
  controller: Control<TFieldValues>
  label: string
  description?: string
  options: SelectOption[]
  placeholder?: string
}

function normalizeNumberValue(value: string) {
  if (!value) {
    return value
  }

  const isNegative = value.startsWith('-')
  const rawValue = isNegative ? value.slice(1) : value

  if (!rawValue) {
    return value
  }

  const [integerPart, decimalPart] = rawValue.split('.', 2)
  const normalizedIntegerPart = integerPart.replace(/^0+(?=\d)/, '')
  const normalizedValue =
    decimalPart !== undefined
      ? `${normalizedIntegerPart}.${decimalPart}`
      : normalizedIntegerPart

  return isNegative ? `-${normalizedValue}` : normalizedValue
}

function FieldInput<TFieldValues extends FieldValues>({
  name,
  controller,
  label,
  description,
  ...props
}: InputProps<TFieldValues>) {
  const { onChange, type, ...inputProps } = props

  return (
    <Controller
      name={name}
      control={controller}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1 m-0">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            id={field.name}
            {...inputProps}
            type={type}
            onChange={(event) => {
              const nextValue =
                type === 'number'
                  ? normalizeNumberValue(event.target.value)
                  : event.target.value

              field.onChange(nextValue)

              if (nextValue !== event.target.value) {
                event.target.value = nextValue
              }

              onChange?.(event)
            }}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

function TextInput<TFieldValues extends FieldValues>({
  name,
  controller,
  label,
  description,
  ...props
}: TextInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={controller}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1 m-0">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Textarea {...field} id={field.name} {...props} />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

function PasswordInput<TFieldValues extends FieldValues>({
  name,
  controller,
  label,
  description,
  ...props
}: InputProps<TFieldValues>) {
  const [showPassword, setShowPassword] = React.useState(false)
  return (
    <Controller
      name={name}
      control={controller}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1 m-0">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <InputGroup>
            <InputGroupInput
              {...field}
              {...props}
              id={field.name}
              type={showPassword ? 'text' : 'password'}
              onContextMenu={(e) => {
                e.preventDefault()
                setShowPassword(!showPassword)
              }}
            />
            <InputGroupAddon align="inline-end">
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </InputGroupAddon>
          </InputGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

function SelectInput<TFieldValues extends FieldValues>({
  name,
  controller,
  label,
  description,
  options,
  ...props
}: SelectInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={controller}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1 m-0">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Select>
            <SelectTrigger className="w-45">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export { FieldInput, PasswordInput, TextInput, SelectInput }
