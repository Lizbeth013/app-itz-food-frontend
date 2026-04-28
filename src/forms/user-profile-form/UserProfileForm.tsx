"use client"
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/LoadingButton';

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string('El nombre debe de ser requerido')
            .min(3,'El nombre debe tener al menos 3 caracteres'),
    address: z.string('Dirección debe ser requerida'),
    city: z.string('La ciudad debe ser requerida'),
    country: z.string('El país debe ser requerido')
});//Fin de formSchema

export type UserFormData = z.infer<typeof formSchema>;

import type { BackEndUser } from '@/api/types';

type Props = {
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    getUser: BackEndUser;
}

export default function UserProfileForm({ onSave, isLoading, getUser }: Props) {

    const form = useForm<UserFormData>({
        defaultValues:{
            email: getUser?.email || '',
            name: getUser?.name || '',
            city: getUser?.city || '',
            address: getUser?.address || '',
            country: getUser?.country || '',
        },
        resolver: zodResolver(formSchema),
    });//Fin de form

    function onSubmit(data: UserFormData) {
        console.log(JSON.stringify(data));
        onSave(data);
    }//Fin de onSubmit

    return (
        <Card>
            <form id="user-profile-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 bg-gray-50 rounded-lg md:pd-10'
            >
                <CardHeader>
                    <CardTitle>
                        Perfil del Usuario
                    </CardTitle>
                    <CardDescription>
                        Consulta y cambia la información de tu perfil aquí
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Controller
                            disabled
                            name="email"
                            control={form.control}
                            render={ ( { field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input
                                        {...field} disabled
                                        id="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder='Teclea tu email'
                                        className='bg-white'
                                    />
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )
                                    }
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Controller
                            disabled
                            name="name"
                            control={form.control}
                            render={ ( { field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}
                                        className='mt-4'
                                >
                                    <FieldLabel>Nombre</FieldLabel>
                                    <Input
                                        {...field} 
                                        id="name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder='Teclea tu nombre'
                                        className='bg-white'
                                    />
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )
                                    }
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <FieldGroup>
                            <Controller
                                disabled
                                name="address"
                                control={form.control}
                                render={ ( { field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Dirección</FieldLabel>
                                        <Input
                                            {...field} disabled
                                            id="address"
                                            aria-invalid={fieldState.invalid}
                                            placeholder='Teclea tu dirección'
                                            className='bg-white'
                                        />
                                        {
                                            fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Controller
                                disabled
                                name="city"
                                control={form.control}
                                render={ ( { field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Ciudad</FieldLabel>
                                        <Input
                                            {...field} disabled
                                            id="city"
                                            aria-invalid={fieldState.invalid}
                                            placeholder='Teclea tu ciudad'
                                            className='bg-white'
                                        />
                                        {
                                            fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Controller
                                disabled
                                name="country"
                                control={form.control}
                                render={ ( { field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>País</FieldLabel>
                                        <Input
                                            {...field} disabled
                                            id="country"
                                            aria-invalid={fieldState.invalid}
                                            placeholder='Teclea tu país'
                                            className='bg-white'
                                        />
                                        {
                                            fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </div>
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal">
                        { isLoading ? <LoadingButton /> : (
                            <Button type="submit" 
                                    form="user-profile-form"
                                    className="bg-orange-500 text-white"
                            >
                                Actualizar
                            </Button>
                        )}
                    </Field>
                </CardFooter>
            </form>
        </Card>
    )
}