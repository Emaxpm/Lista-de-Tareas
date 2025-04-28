"use client"
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

type Props = {
    titulo: string;
    desc: string;
    date: string;
    isCompleted: boolean;
}

const TareaTarjeta = ({ titulo, desc, date, isCompleted }: Props) => {

    const [completed, setCompleted] = useState(isCompleted)

    const handleClick = () => {
        setCompleted((prevState) => !prevState)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl text-gray-800'>
                    {titulo}
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <p className='text-sm textgray-600'> {desc} </p>
            </CardContent>
            <Separator />
            <CardFooter className='flex justify-between'>
                <p className="text-sm text-gray-600">
                    {date}
                </p>

                {completed ? (
                    <CheckIcon className='text-green-400' />
                ) : (<Button variant="outline" onClick={handleClick}>Completar</Button>)
                }

            </CardFooter>
        </Card>

    )
}

export default TareaTarjeta